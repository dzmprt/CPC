namespace CPC.Models;

public class CarFilter
{
    public int? CarColorId { get; init; }
    
    public int? CarMarkId { get; init; }
    
    public int? CarModelId { get; init; }
    
    public string? VinFreeText { get; init; }
    
    public int? Limit { get; init; }
    
    public int? Offset { get; init; }
}