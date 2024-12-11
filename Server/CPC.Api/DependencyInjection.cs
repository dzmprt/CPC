using System.Reflection;
using System.Text.Json.Serialization;
using CPC.Api.JsonSerializer;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.OpenApi.Models;

namespace CPC.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddAspNetServices(this IServiceCollection services, IConfiguration configuration)
    {
        services = services
            .AddHttpContextAccessor()
            .AddResponseCompression(options => { options.EnableForHttps = true; })
            .Configure<JsonOptions>(options =>
            {
                options.SerializerOptions.Converters.Add(new TrimmingConverter());
                options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            })
            .AddSwagger(
                Assembly.GetExecutingAssembly(),
                configuration["AppInfo:AppName"]!,
                configuration["AppInfo:Version"]!,
                configuration["AppInfo:Description"]!)
            .AddDevCors();
        return services;
    }
    
    private static IServiceCollection AddDevCors(this IServiceCollection services)
    {
        return services
            .AddCors(options =>
            {
                options.AddPolicy(CorsPolicy.AllowAll, policy =>
                {
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    policy.AllowAnyOrigin();
                    policy.WithExposedHeaders("*");
                });
            });
    }
    
        private static IServiceCollection AddSwagger(
        this IServiceCollection services,
        Assembly apiAssembly,
        string appName,
        string version,
        string description)
    {
        return services.AddEndpointsApiExplorer()
            .AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(type => type.ToString());

                options.SwaggerDoc(version, new OpenApiInfo
                {
                    Version = version,
                    Title = appName,
                    Description = description
                });
                
                // using System.Reflection;
                var xmlFilename = $"{apiAssembly.GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });
    }
}