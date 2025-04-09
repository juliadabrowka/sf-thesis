using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using sf.Models;
using sf.Repositories;
using sf.Services;
using WebApplicationBuilder = Microsoft.AspNetCore.Builder.WebApplicationBuilder;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using sf.Program.Data;

namespace sf.Program;

class Program
{
    static async Task Main(string[] args)
    {
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

            string password = "admin";
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
        builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var keyBytes = Convert.FromBase64String(builder.Configuration["JwtSettings:Key"]);
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                    ValidAudience = builder.Configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                };
            });

        builder.Services.AddDbContext<SfDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
        
        // add services
        builder.Services.AddScoped<IAuthService, AuthService>();
        
        builder.Services.AddScoped<ITripRepository, TripRepository>();
        builder.Services.AddScoped<ITripService, TripService>();

        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();

        builder.Services.AddScoped<IArticleService, ArticleService>();
        builder.Services.AddScoped<IArticleRepository, ArticleRepository>();

        builder.Services.AddScoped<ITripApplicationRepository, TripApplicationRepository>();

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
