using Microsoft.AspNetCore.Identity.Data;
using OrderSystem.Order.API.Models.DTOs;
using LoginRequest = OrderSystem.Order.API.Models.DTOs.Auth.LoginRequest;

namespace OrderSystem.Order.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Result> Login(LoginRequest login);
    }
}
