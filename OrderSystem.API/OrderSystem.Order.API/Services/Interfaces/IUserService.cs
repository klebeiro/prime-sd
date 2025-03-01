using OrderSystem.Order.API.Models;
using OrderSystem.Order.API.Models.DTOs;
using OrderSystem.Order.API.Models.DTOs.User;

namespace OrderSystem.Order.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<Result> CreateUser(UserRequest user);
        Task<Result> RetrieveUser(int id);
        Task<Result> UpdateUser(UserRequest userUpdate, int id);
        Task<Result> DeleteUser(int id);
    }
}
