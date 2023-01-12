namespace SaM.AnyDeals.DataAccess.Models.Elastic;

public class AdvertElasticEntry
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Creator { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? PreviewUrl { get; set; }
}
