using System.Security.Cryptography;

namespace sf.Utils;

public class GenerateSecureKey
{
    public static string GenerateKey(int length = 32)
    {
        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] randomBytes = new byte[length];
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }
}