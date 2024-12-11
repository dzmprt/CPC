using CPC.Api.Abstractions;
using CPC.Api.Persistence;
using CPC.Models;
using Microsoft.AspNetCore.Mvc;

namespace CPC.Api.Apis;

public class CarApi : IApi
{
    const string tag = "Cars";

    const string baseApiUrl = $"api/v1/{tag}";
    
    public void Register(WebApplication app)
    {
        app.MapGet($"{baseApiUrl}/{{id}}", GetCar)
            .Produces<Car[]>()
            .Produces(404)
            .WithDescription($"Get car by id.")
            .WithOpenApi()
            .WithTags(tag);
        
        app.MapGet($"{baseApiUrl}", GetCars)
            .Produces<Car[]>()
            .WithName($"Get cars.")
            .WithTags(tag);
        
        app.MapGet($"{baseApiUrl}/Colors", GetCarColors)
            .Produces<CarColor[]>()
            .WithName($"Get car colors.")
            .WithTags(tag);
        
        app.MapGet($"{baseApiUrl}/Models", GetCarModels)
            .Produces<CarModel[]>()
            .WithName($"Get car models.")
            .WithTags(tag);
        
        app.MapGet($"{baseApiUrl}/Marks", GetCarMarks)
            .Produces<CarMark[]>()
            .WithName($"Get car marks.")
            .WithTags(tag);
    }
    
    private Task<CarMark[]> GetCarMarks()
    {
        return Task.FromResult(Repository.CarMarks.ToArray());
    }

    private Task<CarModel[]> GetCarModels()
    {
        return Task.FromResult(Repository.CarModels.ToArray());
    }
    
    private Task<CarColor[]> GetCarColors()
    {
        return Task.FromResult(Repository.CarColors.ToArray());
    }

    private Task<IResult> GetCar([FromRoute] int id, CancellationToken cancellationToken)
    {
        Car? car = Repository.Cars.SingleOrDefault(c => c.CarId == id);
        return Task.FromResult(car is null ? Results.NotFound() : Results.Ok(car));
    }
    
    private Task<Car[]> GetCars([AsParameters] CarFilter carFilter, HttpContext context, CancellationToken cancellationToken)
    {
        var cars = Repository.Cars.OrderBy(c => c.CarId).AsEnumerable();
        
        if (carFilter.CarMarkId.HasValue)
        {
            cars = cars.Where(c => c.Model.Mark.CarMarkId == carFilter.CarMarkId.Value);
        }

        if (carFilter.CarModelId.HasValue)
        {
            cars = cars.Where(c => c.Model.CarModelId == carFilter.CarModelId.Value);
        }

        if (carFilter.CarColorId.HasValue)
        {
            cars = cars.Where(c => c.Color.CarColorId == carFilter.CarColorId.Value);
        }

        if (!string.IsNullOrWhiteSpace(carFilter.VinFreeText))
        {
            var normalizedVin = carFilter.VinFreeText.ToUpperInvariant();
            cars = cars.Where(c => c.Vin.Contains(normalizedVin));
        }
        
        context.Response.Headers.Append("X-Total-Count", cars.Count().ToString());

        if (carFilter.Offset.HasValue)
        {
            cars = cars.Skip(carFilter.Offset.Value);
        }

        if (carFilter.Limit.HasValue)
        {
            cars = cars.Take(carFilter.Limit.Value);
        }
        
        return Task.FromResult(cars.ToArray());
    }
}