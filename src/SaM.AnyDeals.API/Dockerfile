#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["../SaM.AnyDeals.API/SaM.AnyDeals.API.csproj", "SaM.AnyDeals.API/"]
COPY ["../SaM.AnyDeals.Application/SaM.AnyDeals.Application.csproj", "SaM.AnyDeals.Application/"]
COPY ["../SaM.AnyDeals.Application.Models/SaM.AnyDeals.Application.Models.csproj", "SaM.AnyDeals.Application.Models/"]
COPY ["../SaM.AnyDeals.Common/SaM.AnyDeals.Common.csproj", "SaM.AnyDeals.Common/"]
COPY ["../SaM.AnyDeals.DataAccess.Models/SaM.AnyDeals.DataAccess.Models.csproj", "SaM.AnyDeals.DataAccess.Models/"]
COPY ["../SaM.AnyDeals.DataAccess/SaM.AnyDeals.DataAccess.csproj", "SaM.AnyDeals.DataAccess/"]
COPY ["../SaM.AnyDeals.Infrastructure/SaM.AnyDeals.Infrastructure.csproj", "SaM.AnyDeals.Infrastructure/"]
RUN dotnet restore "SaM.AnyDeals.API/SaM.AnyDeals.API.csproj"
COPY . .
WORKDIR "/src/SaM.AnyDeals.API"
RUN dotnet build "SaM.AnyDeals.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SaM.AnyDeals.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SaM.AnyDeals.API.dll"]