using System.ComponentModel.DataAnnotations;

namespace sf.Models;

public class LoginRequest
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 4)]
    public string Password { get; set; }
}
