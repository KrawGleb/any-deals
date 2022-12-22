﻿namespace SaM.AnyDeals.Application.Models.Responses;

public class ErrorResponse : Response
{
    public override bool Succeeded { get; set; } = false;
    public IEnumerable<string>? Errors { get; set; }
}
