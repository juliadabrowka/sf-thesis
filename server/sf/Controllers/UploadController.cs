using Microsoft.AspNetCore.Mvc;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class UploadController : ControllerBase
{
    private readonly string _uploadPath = "wwwroot/uploads";

    [HttpPost("uploadImage")]
    public async Task<IActionResult> UploadImage()
    {
        try
        {
            using var memoryStream = new MemoryStream();
            await Request.Body.CopyToAsync(memoryStream);

            if (memoryStream.Length == 0)
                return BadRequest("No file uploaded.");

            var fileName = $"{Guid.NewGuid()}.jpg";
            var filePath = Path.Combine(_uploadPath, fileName);

            await System.IO.File.WriteAllBytesAsync(filePath, memoryStream.ToArray());

            var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";

            return Ok(new { imageUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}