using System.Collections.Concurrent;
using CPC.Models;

namespace CPC.Api.Persistence;

public static class Repository
{
    private static CarMark[] _carMarks =
    [
        new()
        {
            CarMarkId = 1,
            Name = "BMW",
            ImgUrl = "imgs/marks/BMW.jpeg"
        },
        new()
        {
            CarMarkId = 2,
            Name = "Audi",
            ImgUrl = "imgs/marks/audi.jpeg"
        },
        new()
        {
            CarMarkId = 3,
            Name = "Honda",
            ImgUrl = "imgs/marks/honda.jpeg"
        },
        new()
        {
            CarMarkId = 4,
            Name = "Toyota",
            ImgUrl = "imgs/marks/toyota.jpeg"
        },
        new()
        {
            CarMarkId = 5,
            Name = "Nissan",
            ImgUrl = "imgs/marks/nissan.jpeg"
        }
    ];
    
    private static CarModel[] _carModels =
    [
        new()
        {
            CarModelId = 1,
            Mark = _carMarks.Single(c => c.CarMarkId == 1),
            Name = "M4",
            ImgUrl = "imgs/models/BMW_M4.jpg"
        },
        new()
        {
            CarModelId = 2,
            Mark = _carMarks.Single(c => c.CarMarkId == 1),
            Name = "X3",
            ImgUrl =  "imgs/models/BMW_X3.jpeg"
        },
        new()
        {
            CarModelId = 3,
            Mark = _carMarks.Single(c => c.CarMarkId == 1),
            Name = "XM",
            ImgUrl =  "imgs/models/BMW_XM.jpeg"
        },
        new()
        {
            CarModelId = 4,
            Mark = _carMarks.Single(c => c.CarMarkId == 2),
            Name = "TT",
            ImgUrl =  "imgs/models/BMW_TT.jpeg"
        },
        new()
        {
            CarModelId = 5,
            Mark = _carMarks.Single(c => c.CarMarkId == 2),
            Name = "Q5",
            ImgUrl =  "imgs/models/audi_Q5.jpg"
        },
        new()
        {
            CarModelId = 6,
            Mark = _carMarks.Single(c => c.CarMarkId == 2),
            Name = "Q8",
            ImgUrl =  "imgs/models/audi_Q8.jpeg"
        },
        new()
        {
            CarModelId = 7,
            Mark = _carMarks.Single(c => c.CarMarkId == 2),
            Name = "A6",
            ImgUrl =  "imgs/models/audi_A6.jpeg"
        },
        new()
        {
            CarModelId = 8,
            Mark = _carMarks.Single(c => c.CarMarkId == 3),
            Name = "Accord",
            ImgUrl = "imgs/models/Honda_Accord.jpeg"
        },
        new()
        {
            CarModelId = 9,
            Mark = _carMarks.Single(c => c.CarMarkId == 3),
            Name = "Odyssey",
            ImgUrl = "imgs/models/Honda_Odyssey.jpeg"
        },
        new()
        {
            CarModelId = 10,
            Mark = _carMarks.Single(c => c.CarMarkId == 3),
            Name = "Passport",
            ImgUrl = "imgs/models/Honda_Passport.jpeg"
        },
        new()
        {
            CarModelId = 11,
            Mark = _carMarks.Single(c => c.CarMarkId == 3),
            Name = "Civic",
            ImgUrl = "imgs/models/Honda_Civic.jpeg"
        },
        new()
        {
            CarModelId = 12,
            Mark = _carMarks.Single(c => c.CarMarkId == 4),
            Name = "RAV4",
            ImgUrl = "imgs/models/Toyota_RAV4.jpeg"
        },
        new()
        {
            CarModelId = 13,
            Mark = _carMarks.Single(c => c.CarMarkId == 4),
            Name = "Prius",
            ImgUrl = "imgs/models/Toyota_Prius.jpeg"
        },
        new()
        {
            CarModelId = 14,
            Mark = _carMarks.Single(c => c.CarMarkId == 4),
            Name = "Camry",
            ImgUrl = "imgs/models/Toyota_Camry.jpeg"
        },
        new()
        {
            CarModelId = 15,
            Mark = _carMarks.Single(c => c.CarMarkId == 5),
            Name = "Altima",
            ImgUrl = "imgs/models/Nissan_Altima.jpeg"
        },
        new()
        {
            CarModelId = 16,
            Mark = _carMarks.Single(c => c.CarMarkId == 5),
            Name = "Leaf",
            ImgUrl = "imgs/models/Nissan_Leaf.jpeg"
        },
        new()
        {
            CarModelId = 17,
            Mark = _carMarks.Single(c => c.CarMarkId == 5),
            Name = "Maxima",
            ImgUrl = "imgs/models/Nissan_Maxima.jpg"
        },
        new()
        {
            CarModelId = 18,
            Mark = _carMarks.Single(c => c.CarMarkId == 5),
            Name = "Frontier",
            ImgUrl = "imgs/models/Nissan_Frontier.jpeg"
        }
    ];

    private static CarColor[] _carColors =
    [
        new()
        {
            CarColorId = 1,
            Name = "Black"
        },
        new()
        {
            CarColorId = 2,
            Name = "Blue"
        },
        new()
        {
            CarColorId = 3,
            Name = "Green"
        },
        new()
        {
            CarColorId = 4,
            Name = "Yellow"
        },
        new()
        {
            CarColorId = 5,
            Name = "Red"
        },
        new()
        {
            CarColorId = 6,
            Name = "White"
        },
        new()
        {
            CarColorId = 7,
            Name = "Pink"
        }
    ];
    
    private static readonly Random Rnd = new Random();
    
    private static Car[] _cars = Enumerable.Range(1, 1000).Select(_ => new Car()
    {
        CarId = Rnd.Next(1, int.MaxValue),
        Color = _carColors[Rnd.Next(0, _carColors.Length)],
        Model = _carModels[Rnd.Next(0, _carModels.Length)],
        Price = Rnd.Next(10, 50) * 1000,
        Vin = RandomString(17, Rnd).ToUpperInvariant()
    }).ToArray();
    
    public static ConcurrentBag<Car> Cars = new(_cars);
    
    public static ConcurrentBag<CarColor> CarColors = new(_carColors);
    
    public static ConcurrentBag<CarModel> CarModels = new(_carModels);
    
    public static ConcurrentBag<CarMark> CarMarks = new(_carMarks);

    private static string RandomString(int length, Random rnd)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[rnd.Next(s.Length)]).ToArray());
    }
}