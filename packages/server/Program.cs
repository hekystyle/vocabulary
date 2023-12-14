
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Vocabulary.Authentication.GitHub;

namespace Vocabulary;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            var connectionString = builder.Configuration.GetConnectionString("Default");
            options.UseMongoDB(connectionString, "Vocabulary");
        });

        builder.Services.AddAuthentication();
        
        // .AddRemoteScheme<GitHubAuthOptions, GitHubAuthHandler>("github", "GitHub", options =>
        // {
        //     options.ClientId = builder.Configuration["GitHub:ClientId"];
        //     options.ClientSecret = builder.Configuration["GitHub:ClientSecret"];
        // });

        builder.Services.AddAuthorization();

        builder.Services.AddIdentityApiEndpoints<AppUser>()
           .AddEntityFrameworkStores<AppDbContext>();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        // app.MapGroup("api/identity").MapIdentityApi<AppUser>();

        app.Run();
    }
}
