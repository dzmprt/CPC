using System.Reflection;
using CPC.Api.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CPC.Api;

public static class WebApplicationExtensions
{
    public static WebApplication RegisterApisEndpoints(this WebApplication app, Assembly assembly)
    {
        var apiTypeInterface = typeof(IApi);
        var apiTypes = assembly.GetTypes()
            .Where(p => p.IsClass && apiTypeInterface.IsAssignableFrom(p));

        foreach (var apiType in apiTypes)
        {
            var api = (IApi)Activator.CreateInstance(apiType)!;
            api.Register(app);
        }

        return app;
    }
    
    /// <summary>
    /// Register app info endpoints.
    /// </summary>
    /// <param name="app"></param>
    /// <returns></returns>
    public static WebApplication RegisterAppInfoEndpoints(this WebApplication app)
    {
        app.MapGet("AppInfo/Version",
                ([FromServices] IConfiguration configuration) => Results.Ok(new { Version = configuration["AppInfo:Version"] }))
            .WithName("Version")
            .WithTags("AppInfo")
            .WithOpenApi();

        app.MapGet("AppInfo/WhoAmI",
                ([FromServices] IConfiguration configuration) => Results.Ok(new { 
                    Version = configuration["AppInfo:Version"], 
                    AppName = configuration["AppInfo:AppName"],
                    Description = configuration["AppInfo:Description"]
                }))
            .WithName("WhoAmI")
            .WithTags("AppInfo")
            .WithOpenApi();

        return app;
    }
}