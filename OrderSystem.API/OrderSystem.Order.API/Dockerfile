# Usa a imagem do .NET 8 como base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

# Usa o SDK do .NET 8 para build e publish
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo de projeto e restaura as dependências
COPY ["OrderSystem.Order.API.csproj", "./"]
RUN dotnet restore "OrderSystem.Order.API.csproj"

# Copia todo o código e compila a aplicação
COPY . .
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

# Usa a imagem final baseada no runtime do .NET 8
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
CMD ["dotnet", "OrderSystem.Order.API.dll"]