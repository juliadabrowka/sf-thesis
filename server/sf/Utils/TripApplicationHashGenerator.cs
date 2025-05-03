using System.Security.Cryptography;
using System.Text;
using sf.Models;

namespace sf.Utils;

public class TripApplicationHashGenerator
{
    public static string GenerateHash(TripApplication tripApplication)
    {
        using (var sha256 = SHA256.Create())
        {
            var rawData = $"{tripApplication.Trip.Name}-{DateTime.UtcNow.Ticks}-{Guid.NewGuid()}";
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            return Convert.ToBase64String(bytes)
                .Replace("+", "")
                .Replace("/", "")
                .Replace("=", "")
                .Substring(0, 16);
        }
    }
}