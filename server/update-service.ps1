param (
    [string]$csharpEnumsPath = "../server/sf/DTOs/Enums",
    [string]$csharpDTOsPath = "../server/sf/DTOs",
    [string]$csharpServicesPath = "../server/sf/Services",
    [string]$outputPath = "./projects/base/src/services"
)

if (Test-Path $outputPath)
{
    Remove-Item -Recurse -Force $outputPath
}
New-Item -ItemType Directory -Path $outputPath | Out-Null

$detectedEnums = @{ }

function Get-EnumFirstValue($enumType)
{
    try
    {
        $enumValues = [Enum]::GetNames([Type]$enumType)
        if ($enumValues.Length -gt 0)
        {
            return $enumValues[0]
        }
    }
    catch
    {
        return $null
    }
    return $null
}


function Convert-CSharpTypeToTypeScript($csharpType) {
    if ($csharpType -match "List<(.+?)>")
    {
        $innerType = $matches[1]
        $tsInnerTypeInfo = Convert-CSharpTypeToTypeScript($innerType)
        return @("$( $tsInnerTypeInfo )[]")
    }

    if ($csharpType -match "IEnumerable<(.+?)>")
    {
        $innerType = $matches[1]
        $tsInnerTypeInfo = Convert-CSharpTypeToTypeScript($innerType)
        return @("$( $tsInnerTypeInfo )[]")
    }

    if ($csharpType -match "(\w+)\?$")
    {
        $baseType = $matches[1]
        $tsTypeInfo = Convert-CSharpTypeToTypeScript($baseType)
        return @("$( $tsTypeInfo ) | undefined")
    }

    switch ($csharpType) {
        "string" {
            return @("string", '""')
        }
        "int" {
            return @("number", "0")
        }
        "long" {
            return @("number", "0")
        }
        "bool" {
            return @("boolean", "false")
        }
        "DateTime" {
            return @("Date", "new Date()")
        }
        "double" {
            return @("number", "0")
        }
        "decimal" {
            return @("number", "0")
        }
        default {
            $enumFirstValue = Get-EnumFirstValue $csharpType
            if ($enumFirstValue)
            {
                return @($csharpType, "$csharpType.$enumFirstValue")
            }
            return @($csharpType, "undefined")
        }
    }
}

function Convert-ToCamelCase($inputString)
{
    if ($inputString.Length -gt 0)
    {
        return ($inputString.Substring(0, 1).ToLower() + $inputString.Substring(1))
    }
    return $inputString
}

function Generate-TypeScriptClass($className, $properties)
{
    $tsClass = "export class $className {`n"
    foreach ($prop in $properties)
    {
        if ($prop.name -eq $className)
        {
            continue
        }

        $typeInfo = Convert-CSharpTypeToTypeScript $prop.type


        if ($typeInfo -is [array])
        {
            $tsType = $typeInfo[0]
            $defaultValue = $typeInfo[1]
        }
        else
        {
            $tsType = $typeInfo
            $defaultValue = $defaultValue
            Write-Host $tsType
        }

        $tsClass += " $( Convert-ToCamelCase $prop.name ): $tsType = $defaultValue;`n"
    }
    $tsClass += "}`n"
    return $tsClass
}


function Generate-TypeScriptEnum($enumName, $values) {
    $tsEnum = "export enum $enumName {`n"
    foreach ($value in $values) {
        $cleanValue = $value.Trim()
        if (-not [string]::IsNullOrWhiteSpace($cleanValue)) {
            $tsEnum += "  $cleanValue = '$cleanValue',`n"
        }
    }
    $tsEnum += "}`n"
    return $tsEnum
}

$outputContent = ""

Get-ChildItem -Path $csharpEnumsPath -Filter *.cs | ForEach-Object {
    $filePath = $_.FullName
    $enumName = $_.BaseName

    Write-Host "Processing file: $filePath"

    $content = Get-Content -Path $filePath -Raw

    if ($content -match 'public enum\s+(?<enumName>\w+)\s*{(?<enumValues>[^}]+)}')
    {
        $enumName = $matches["enumName"]
        $enumValues = $matches["enumValues"] -split ',\s*'


        $detectedEnums[$enumName] = $enumValues

        $outputContent += Generate-TypeScriptEnum $enumName $enumValues
        Write-Host "Generated TypeScript enum for $enumName"
    }
}

Get-ChildItem -Path $csharpDTOsPath -Filter *.cs | ForEach-Object {
    $filePath = $_.FullName
    $className = $_.BaseName
    $properties = @()

    $content = Get-Content -Path $filePath -Raw

    $regex = 'public\s+(?<type>[\w<>,? ]+)\s+(?<name>\w+)\s*{'
    $matches = [regex]::Matches($content, $regex)

    if ($matches.Count -eq 0) {
        Write-Host "No properties found for class $className"
    } else {
        foreach ($match in $matches) {
            $properties += [PSCustomObject]@{
                name = $match.Groups["name"].Value;
                type = $match.Groups["type"].Value.Trim()
            }
        }

        $tsClass = Generate-TypeScriptClass $className $properties
        $outputContent += $tsClass
        Write-Host "generated TS class for $className"
    }
}

Set-Content -Path (Join-Path $outputPath "data-types.ts") -Value $outputContent
Write-Host "generated types successfully"

function Get-CustomParams($methods)
{
    $builtInTsTypes = @("string", "number", "boolean", "Date", "void")

    $customTypes = @{ }

    foreach ($method in $methods)
    {
        $paramsArray = $method.Parameters -split ','
        foreach ($param in $paramsArray)
        {
            if ($param -match '(\w+)\s+(\w+)')
            {
                $csharpType = $matches[1]

                $typeTs = (Convert-CSharpTypeToTypeScript $csharpType)

                if ($builtInTsTypes -notcontains $typeTs)
                {
                    $customTypes[$typeTs] = $true
                }
            }
        }
    }

    return ($customTypes.Keys -join ', ')
}

function Has-VoidReturnType
{
    param (
        [array]$methods
    )

    foreach ($method in $methods)
    {
        if ($method.ReturnType -eq "void")
        {
            return $true
        }
    }
    return $false
}


function Generate-TypeScriptService($serviceName, $methods) {
    $importParams = Get-CustomParams $methods
    $hasVoids = Has-VoidReturnType $methods

    $tsService = "import { HttpClient } from '@angular/common/http';`n"
    $tsService += "import { Injectable } from '@angular/core';`n"
    if ($importParams -ne "")
    {
        $tsService += "import { $importParams } from './data-types';`n"
    }
    $tsService += "import { Observable"
    if ($hasVoids)
    {
        $tsService += ", map"
    }
    $tsService += " } from 'rxjs';`n`n"

    $tsService += "@Injectable({ providedIn: 'root' })`n"
    $tsService += "export class ${serviceName} {`n"
    $tsService += "  constructor(private http: HttpClient) {}`n`n"

    foreach ($method in $methods) {
        $paramList = @()
        $paramsArray = $method.Parameters -split ','
        $paramNames = @()

        foreach ($param in $paramsArray)
        {
            if ($param -match '(\w+)\s+(\w+)')
            {
                $csharpType = $matches[1]
                $paramName = $matches[2]

                $typeTs = Convert-CSharpTypeToTypeScript($csharpType)

                $paramList += "${paramName}: $( $typeTs )"
                $paramNames += $paramName
            }
        }

        $cammelCaseMethodName = Convert-ToCamelCase $method.Name
        $returnType = $method.ReturnType
        $apiUrl = "/api/$( $cammelCaseMethodName )"
        $httpMethod = $method.HttpMethod

        $addMap = ".pipe(map(() => undefined))"
        $tsService += "  public $( $cammelCaseMethodName )($( $paramList -join ', ' )): Observable<$returnType> {`n"
        $tsService += "    return this.http.$httpMethod($(
        if ($paramList.Count -gt 0)
        {
            if ($httpMethod -eq "get" -and $returnType -notcontains "[]")
            {
                "`'$apiUrl/\$\{$( $paramNames -join ', ' )}`'"
            }
            else
            {
                "'$apiUrl', {$( $paramNames -join ', ' )}"
            }
        }
        else
        {
            "'$apiUrl'"
        }
        ))"
        $tsService += if ($returnType -eq "void")
        {
            "$addMap"
        }
        else
        {
            ""
        }
        $tsService += " as Observable<$returnType>;`n"
        $tsService += "  }`n"
    }

    $tsService += "}`n"
    return $tsService
}

function Convert-ToKebabCase($inputString)
{
    return ($inputString -creplace '([a-z])([A-Z])', '$1-$2').ToLower()
}

$outputContent = ""

Get-ChildItem -Path $csharpServicesPath -Filter *.cs | ForEach-Object {
    $filePath = $_.FullName
    $className = $_.BaseName

    if ($className -match "User")
    {
        Write-Host "Skipping User service: $className"
        return
    }

    if ( $className.StartsWith("I"))
    {
        Write-Host "Skipping interface file: $filePath"
    }
    $methods = @()

    $content = Get-Content -Path $filePath -Raw
    $regexPattern = 'public\s+async\s+Task(?:<(?<returnType>[^>]+)>)?\s+(?<name>\w+)\((?<params>[^)]*)\)'
    $methodMatches = [regex]::Matches($content, $regexPattern)

    foreach ($match in $methodMatches) {
        $methodName = $match.Groups["name"].Value
        $returnType = if ( [string]::IsNullOrWhiteSpace($match.Groups["returnType"].Value))
        {
            "void"
        }
        else
        {
            $match.Groups["returnType"].Value
        }

        $methods += [PSCustomObject]@{
            Name = $methodName
            ReturnType = $returnType
            Parameters = $match.Groups["params"].Value.Trim()
            HttpMethod = if ($methodName -match "^(update|Update)" -or $methodName -match "^(create|Create)")
            {
                "post"
            }
            elseif ($methodName -match "^(get|Get)")
            {
                "get"
            }
            else
            {
                "delete"
            }
        }
    }

    $tsService = Generate-TypeScriptService $className $methods
    $kebabCaseMethodName = Convert-ToKebabCase $className

    $outputFilePath = Join-Path $outputPath "${kebabCaseMethodName}.service.ts"
    Set-Content -Path $outputFilePath -Value $tsService
}

Write-Host "Service generation completed."