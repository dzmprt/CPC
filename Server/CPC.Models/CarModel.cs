namespace CPC.Models;

public record struct CarModel
{
    public int CarModelId { get; init; }

    public string Name { get; init; }
    
    public CarMark Mark { get; init; }
    
    public string ImgUrl { get; init; }
}