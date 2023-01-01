using CsvHelper;
using CsvHelper.Configuration.Attributes;
using System.Globalization;

namespace SaM.AnyDeals.DataAccess.Population.Helpers;

public class CitiesAndCountriesCsvLoader
{
    private static IEnumerable<Record> _records;

    static CitiesAndCountriesCsvLoader()
    {
        LoadData();
    }

    private static void LoadData()
    {
        using var reader = new StreamReader("../SaM.AnyDeals.DataAccess/Population/PrepopulatedData/worldcities.csv");
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

        _records = csv.GetRecords<Record>().ToList();
    }

    public static List<string> GetCountries()
    {
        var countries = _records.Select(r => r.Country).Distinct().ToList();

        return countries!;
    }

    public static List<string> GetCitiesByCountry(string country)
    {
        var cities = _records
            .Where(r => r.Country!.ToLower() == country.ToLower())
            .Select(r => r.CityAscii)
            .Distinct()
            .ToList();

        return cities!;
    }

    private class Record
    {
        [Name("country")] public string? Country { get; set; }
        [Name("city_ascii")] public string? CityAscii { get; set; }
        [Name("city")] private string? City { get; set; }
        [Name("lat")] private string? Lat { get; set; }
        [Name("lng")] private string? Lng { get; set; }
        [Name("iso2")] private string? Iso2 { get; set; }
        [Name("iso3")] private string? Iso3 { get; set; }
        [Name("admin_name")] private string? AdminName { get; set; }
        [Name("capital")] private string? Capital { get; set; }
        [Name("population")] private string? Population { get; set; }
        [Name("id")] private string? Id { get; set; }
    }
}
