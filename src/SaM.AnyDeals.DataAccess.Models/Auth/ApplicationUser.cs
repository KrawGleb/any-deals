﻿using Microsoft.AspNetCore.Identity;
using SaM.AnyDeals.DataAccess.Models.Entries;

namespace SaM.AnyDeals.DataAccess.Models.Auth;

public class ApplicationUser : IdentityUser
{
    public decimal Balance { get; set; }
    public List<AdvertDbEntry>? Adverts { get; set; }
    public List<OrderDbEntry>? Orders { get; set; }
    public List<OrderDbEntry>? Execution { get; set; }
    public List<ReviewDbEntry>? Reviews { get; set; }
    public List<MessageDbEntry>? Messages { get; set; }
}