namespace CPC.Models;

public record struct CarMark
{
    public int CarMarkId { get; init; }
    
    public string Name { get; init; }
    
    public string ImgUrl { get; init; }
}