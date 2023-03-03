using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace SaM.AnyDeals.IdentityServer;

public static class Config
{
    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new("AnyDealsAPI", "AnyDeals API", new[] { JwtClaimTypes.Name })
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
            new("AnyDealsAPI", "AnyDeals API")
        };

    public static IEnumerable<Client> Clients =>
        new List<Client>
        {
            new()
            {
                ClientId = "AnyDealsWeb",
                ClientName = "AnyDeals Web (Docker)",
                AllowedGrantTypes = GrantTypes.Code,
                RequireClientSecret = false,
                RequirePkce = true,
                AccessTokenLifetime = 60 * 60, // 1 hour
                RedirectUris =
                {
                    "http://localhost/signin-oidc",
                    "http://localhost:80/signin-oidc",
                    "http://anydeals.norwayeast.cloudapp.azure.com/signin-oidc",
                    "http://anydeals.norwayeast.cloudapp.azure.com:80/signin-oidc",
                    "http://localhost/silent",
                    "http://localhost:80/silent",
                    "http://anydeals.norwayeast.cloudapp.azure.com/silent",
                    "http://anydeals.norwayeast.cloudapp.azure.com:80/silent",
                },
                PostLogoutRedirectUris =
                {
                    "http://localhost/signout-oidc",
                    "http://localhost:80/signout-oidc",
                    "http://anydeals.norwayeast.cloudapp.azure.com/signout-oidc",
                    "http://anydeals.norwayeast.cloudapp.azure.com:80/signout-oidc"
                },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "AnyDealsAPI"
                },
                AllowAccessTokensViaBrowser = true
            },
            new()
            {
                ClientId = "LocalAnyDealsWeb",
                ClientName = "AnyDeals Web (Local)",
                AllowedGrantTypes = GrantTypes.Code,
                RequireClientSecret = false,
                RequirePkce = true,
                AccessTokenLifetime = 60 * 60, // 1 hour
                RedirectUris =
                {
                    "http://localhost:3000/signin-oidc",
                    "http://localhost:3000/silent",
                    "https://localhost:3000/signin-oidc",
                    "https://localhost:3000/silent"
                },
                AllowedCorsOrigins =
                {
                    "http://localhost:3000",
                    "https://localhost:3000"
                },
                PostLogoutRedirectUris =
                {
                    "http://localhost:3000/signout-oidc",
                    "https://localhost:3000/signout-oidc"
                },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "AnyDealsAPI"
                },
                AllowAccessTokensViaBrowser = true
            },
            new()
            {
                ClientId = "Postman",
                ClientName = "Postman",
                AllowedGrantTypes = GrantTypes.Code,
                RequireClientSecret = false,
                RequirePkce = false,
                RedirectUris =
                {
                    "https://oauth.pstmn.io/v1/callback"
                },
                PostLogoutRedirectUris =
                {
                    "https://oauth.pstmn.io/v1/"
                },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "AnyDealsAPI"
                },
                AllowAccessTokensViaBrowser = true
            }
        };
}