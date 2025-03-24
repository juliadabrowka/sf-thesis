using Microsoft.AspNetCore.Mvc;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class UploadController : ControllerBase
{
    private readonly string __uploadPath = "wwwroot/uploads";

    [HttpPost("uploadImage")]
    public async Task<IActionResult> UploadImage([FromBody] IFormFile file)
    {
        if (file == null || file.Length == 0) return BadRequest("No file uploaded");

        string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
        string filePath = Path.Combine(__uploadPath, fileName);

        if (!Directory.Exists(__uploadPath)) Directory.CreateDirectory(__uploadPath);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        string fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
        return Ok(new { url = fileUrl });
    }
}