using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface IAuthService
{
    Task<string> GetAuthentication(string username, string password);
}

public class AuthService(IOptions<JwtSettings> jwtSettings, IUserRepository userRepository)
    : IAuthService
{
    public async Task<string> GetAuthentication(string username, string password)
    {
        var user = await userRepository.GetByUsernameAsync(username);
            
        if (user == null || !VerifyPassword(password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        return GenerateToken(user);
    }
    
    private bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
    
    private string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings.Value.Issuer,
            audience: jwtSettings.Value.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(jwtSettings.Value.ExpirationInMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}