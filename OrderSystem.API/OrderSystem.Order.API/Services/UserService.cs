using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Order.API.Infrastructure.Database;
using OrderSystem.Order.API.Models;
using OrderSystem.Order.API.Models.DTOs;
using OrderSystem.Order.API.Models.DTOs.User;
using OrderSystem.Order.API.Services.Interfaces;

namespace OrderSystem.Order.API.Services
{
    public class UserService : IUserService
    {
        private OrderSystemDbContext _dbContext;

        public UserService(OrderSystemDbContext dbContext) {
            _dbContext = dbContext;
        }

        /*
         * Recebe no request os dados do usuário, valida o email e a senha, criptografa a senha, 
         * armazena no banco e retorna um viewmodel pro front-end após confirmar o cadastro
         */
        public async Task<Result> CreateUser(UserRequest user)
        {
            if (user.Password.Length < 8) 
            {
                return new Result
                {
                    Success = false,
                    Message = "A senha precisa ter pelo menos 8 caracteres.",
                    Data = new UserViewModel()
                };
            }

            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            bool isValid = Regex.IsMatch(user.Email, pattern);

            if(!isValid)
            {
                return new Result
                {
                    Success = false,
                    Message = "E-mail inválido.",
                    Data = new UserViewModel()
                };
            }


            if (await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email) != null)
            {
                return new Result
                {
                    Success = false,
                    Message = "Já existe um usuário com o e-mail informado",
                    Data = new UserViewModel()
                };
            }

            User createdUser = new User {
                Email = user.Email,
                Name = user.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
            };

            _dbContext.Users.Add(createdUser);
            await _dbContext.SaveChangesAsync();

            return new Result
            {
                Success = true,
                Message = "Usuário cadastrado com sucesso.",
                Data = new UserViewModel 
                {
                    Email = createdUser.Email,
                    Name = createdUser.Name
                }
            };
        }

        /*
         * Carregar usuário, retorna um erro se o usuário não for encontrado e um viewmodel de clientes se for.
         */
        public async Task<Result> RetrieveUser(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (user  == null) {
                return new Result
                {
                    Success = false,
                    Message = "Usuário não encontrado.",
                    Data = new UserViewModel()
                };
            }

            return new Result()
            {
                Success = true,
                Message = "Usuário encontrado.",
                Data = new UserViewModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                }
            };
        }

        /*
         * Atualização de dados do usuário, se as credenciais são inválidas ou se o usuário não existe retorna um erro, senão ele atualiza 
         * os dados na entidade que está sendo trackeada encriptando a senha, persiste as alterações e retorna mensagem de sucesso
         * com a entidade nova
         */
        public async Task<Result> UpdateUser(UserRequest userUpdate, int userId)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == userId);

            if (user == null)
            {
                return new Result
                {
                    Success = false,
                    Message = "Usuário não encontrado",
                    Data = new UserViewModel()
                };
            }

            if (await _dbContext.Users.FirstOrDefaultAsync(user => user.Email == userUpdate.Email) != null) 
            {
                return new Result
                {
                    Success = false,
                    Message = "Já existe um usuário com o e-mail informado",
                    Data = new UserViewModel()
                };
            }

            if (!string.IsNullOrWhiteSpace(userUpdate.Name))
                user.Name = userUpdate.Name;

            if (!string.IsNullOrWhiteSpace(userUpdate.Email))
                user.Email = userUpdate.Email;

            if (!string.IsNullOrEmpty(userUpdate.Password) && userUpdate.Password.Length >= 8)
                user.Password = BCrypt.Net.BCrypt.HashPassword(userUpdate.Password); 

            await _dbContext.SaveChangesAsync();

            return new Result
            {
                Success = true,
                Message = "Usuário atualizado com sucesso",
                Data = new UserViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name
                }
            };
        }

        /*
         * Carrega os dados de um usuário do banco com base no id, se não encontrar retorna erro e se encontrar remove do banco
         */
        public async Task<Result> DeleteUser(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (user == null)
            {
                return new Result
                {
                    Success = false,
                    Message = "Usuário não encontrado",
                    Data = new UserViewModel()
                };
            }

            _dbContext.Remove(user);
            await _dbContext.SaveChangesAsync();

            return new Result
            {
                Success = true,
                Message = "Usuário deletado com sucesso",
                Data = new UserViewModel()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name
                }
            };
        }

    }
}
