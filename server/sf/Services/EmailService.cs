using System.Net;
using System.Net.Mail;

namespace sf.Services;

public interface IEmailService
{
    Task SendAsync(string to, string subject, string htmlBody);
}

public class EmailService(IConfiguration configuration) : IEmailService
{
    public async Task SendAsync(string to, string subject, string htmlBody)
    {
        var smtpHost = configuration["SMTP_HOST"];
        var smtpPort = int.Parse(configuration["SMTP_PORT"]);
        var smtpUser = configuration["SMTP_USERNAME"];
        var smtpPass = configuration["SMTP_PASSWORD"];
        var fromAddress = configuration["SMTP_FROMEMAIL"];

        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUser, smtpPass),
            EnableSsl = true
        };

        var message = new MailMessage
        {
            From = new MailAddress(fromAddress),
            Subject = subject,
            Body = htmlBody,
            IsBodyHtml = true
        };

        message.To.Add(to);

        await client.SendMailAsync(message);
    }
}