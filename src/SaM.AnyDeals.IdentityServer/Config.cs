using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace SaM.AnyDeals.IdentityServer;

public static class Config
{
    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ApiResource("AnyDealsAPI", "AnyDeals API", new [] { JwtClaimTypes.Name })
            {
                Scopes = { "AnyDealsAPI" }
            }
        };

    public static IEnumerable<IdentityResource> IdentityResources =>
        new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
            new ApiScope("AnyDealsAPI", "AnyDeals API"),
        };

    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            new Client
            {
                ClientId = "AnyDealsWeb",
                ClientName = "AnyDeals Web (Docker)",
                AllowedGrantTypes = GrantTypes.Code,
                RequireClientSecret = false,
                RequirePkce = true,
                RedirectUris =
                {
                    "http://localhost:80/signin-oidc"
                },
                PostLogoutRedirectUris =
                {
                    "http://localhost:80/signout-oidc"
                },
                AllowedScopes = 
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "AnyDealsAPI"
                },
                AllowAccessTokensViaBrowser = true,
            }
        };
}