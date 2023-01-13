namespace SaM.AnyDeals.DataAccess.Models.Elastic;

public class AdvertElasticEntry
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Creator { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public int? Goal { get; set; }
    public int? Group { get; set; }
    public int? Interest { get; set; }
    public string? Category { get; set; }
    public string? PreviewUrl { get; set; }
}
