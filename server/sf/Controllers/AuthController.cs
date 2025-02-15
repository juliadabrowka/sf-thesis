

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using sf.Models;
using sf.Repositories;
using sf.Services;
using LoginRequest = sf.Models.LoginRequest;

namespace sf.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest request)
  {
    Console.Write(request);
    try
    {
      var token = await authService.GetAuthentication(request.Username, request.Password);
      return Ok(new { token });
    }
    catch (UnauthorizedAccessException)
    {
      return Unauthorized();
    }
  }
}
