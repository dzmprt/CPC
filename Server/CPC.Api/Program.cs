using System.Reflection;
using CPC.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAspNetServices(builder.Configuration);

var app = builder.Build();

app.RegisterApisEndpoints(Assembly.GetExecutingAssembly())
    .RegisterAppInfoEndpoints()
    .UseCors(CorsPolicy.AllowAll)
    .UseStaticFiles()
    .UseSwagger(c => { c.RouteTemplate = "swagger/{documentname}/swagger.json"; })
    .UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint($"/swagger/{builder.Configuration["AppInfo:Version"]}/swagger.json", builder.Configuration["AppInfo:Version"]);
        options.RoutePrefix = "swagger";
    });;

app.Run();