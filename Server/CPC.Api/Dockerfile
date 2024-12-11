FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Server/CPC.Api/CPC.Api.csproj", "Server/CPC.Api/"]
COPY ["Server/CPC.Models/CPC.Models.csproj", "Server/CPC.Models/"]
RUN dotnet restore "Server/CPC.Api/CPC.Api.csproj"
COPY . .
WORKDIR "/src/Server/CPC.Api"
RUN dotnet build "CPC.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "CPC.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CPC.Api.dll"]
