using System.Net.Mail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using sf.Models;
using sf.Repositories;
using sf.Services;
using WebApplicationBuilder = Microsoft.AspNetCore.Builder.WebApplicationBuilder;
using System.Text.Json.Serialization;
using DotNetEnv;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using sf.Controllers;
using sf.Program.Data;

namespace sf.Program;

class Program
{
    static async Task Main(string[] args)
    {
        Env.Load();
        var builder = WebApplication.CreateBuilder(args);

        // services config
        ConfigureServices(builder);

        // build app
        var app = builder.Build();

        // middleware config
        ConfigureMiddleware(app);

        // register default user
        await RegisterDefaultUser(app);

        // ensures app is running
        app.Run();
    }

    private static async Task RegisterDefaultUser(WebApplication app)
    {
        var scope = app.Services.CreateScope();
        var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
        try
        {
            var users = await userService.GetUserList();
            bool userExists = users.Any(user => user.Username == "admin");

            if (userExists)
            {
                Console.Write("User already exists");
                return;
            }
            string password = Env.GetString("ADMIN_PASSWORD");
            if (string.IsNullOrEmpty(password))
            {
                throw new Exception("Admin password is not set in .env file.");
            }
            await userService.CreateUser("admin", password);

            Console.Write("User created successfully");
        }
        catch (Exception ex)
        {
            Console.Write($"Error creating user: {ex.Message}");
        }
    }

    private static void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Configuration.AddEnvironmentVariables();
        builder.Services.Configure<FormOptions>(options =>
        {
            options.MultipartBodyLengthLimit = 209715200;
        });
        
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

        builder.Services.AddAutoMapper(typeof(Program)); 
        builder.Services.Configure<JwtSettings>(options =>
        {
            options.Key = Env.GetString("JWT_KEY");
            options.Issuer = Env.GetString("JWT_ISSUER");
            options.Audience = Env.GetString("JWT_AUDIENCE");
            options.ExpirationInMinutes = Env.GetInt("JWT_EXPIRATION_IN_MINUTES", 60);
        });

        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var keyBytes = Convert.FromBase64String(Env.GetString("JWT_KEY"));
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["JWT_ISSUER"],
                    ValidAudience = builder.Configuration["JWT_AUDIENCE"],
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                };
                
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var expirationTime = Env.GetInt("JWT_EXPIRATION_IN_MINUTES", 60);
                        context.HttpContext.Response.Headers.Add("JWT-Expiration-Time", expirationTime.ToString());
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddDbContext<SfDbContext>(options =>
            options.UseSqlServer(Env.GetString("DB_CONNECTION_STRING")));

        
        // add services
        builder.Services.AddScoped<IAuthService, AuthService>();
        
        builder.Services.AddScoped<IArticleService, ArticleService>();
        builder.Services.AddScoped<IArticleRepository, ArticleRepository>();

        builder.Services.AddScoped<ISurveyService, SurveyService>();
        
        builder.Services.AddScoped<ISurveyAnswerRepository, SurveyAnswerRepository>();
        builder.Services.AddScoped<ISurveyAnswerService, SurveyAnswerService>();
        
        builder.Services.AddScoped<ISurveyRepository, SurveyRepository>();
        builder.Services.AddScoped<ISurveyService, SurveyService>();
        
        builder.Services.AddScoped<ISurveyQuestionRepository, SurveyQuestionRepository>();
        builder.Services.AddScoped<ISurveyQuestionService, SurveyQuestionService>();
        
        builder.Services.AddScoped<ISurveyResponseRepository, SurveyResponseRepository>();
        builder.Services.AddScoped<ISurveyResponseService, SurveyResponseService>();

        builder.Services.AddScoped<ITripRepository, TripRepository>();
        builder.Services.AddScoped<ITripService, TripService>();
        builder.Services.AddScoped<ITripApplicationService, TripApplicationService>();
        builder.Services.AddScoped<ITripApplicationRepository, TripApplicationRepository>();
        builder.Services.AddScoped<ITripTermRepository, TripTermRepository>();
        
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        
        builder.Services.AddScoped<IEmailService, EmailService>();
        builder.Services.AddScoped<SmtpClient>(provider => 
            new SmtpClient("smtp.gmail.com")
            {
                Credentials = new System.Net.NetworkCredential(
                    builder.Configuration["SMTP_USERNAME"],
                    builder.Configuration["SMTP_PASSWORD"]
                ),
                EnableSsl = true
            });

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAngularApp", policy =>
            {
                policy.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        builder.Services.AddAuthorization();
        builder.Services.AddControllers();
        
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
    }

    private static void ConfigureMiddleware(WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowAngularApp");
        app.UseStaticFiles();
        app.UseRouting();
        
        app.UseAuthentication(); 
        app.UseAuthorization();

        app.MapControllers();
    }
}
