﻿namespace SaM.AnyDeals.Application.Models.ViewModels;

public class CityViewModel
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public CountryViewModel? Country { get; set; }
}