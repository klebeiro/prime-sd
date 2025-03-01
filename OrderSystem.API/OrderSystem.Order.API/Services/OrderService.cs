using Microsoft.EntityFrameworkCore;
using OrderSystem.Order.API.Infrastructure.Database;
using OrderSystem.Order.API.Infrastructure.ExternalServices;
using OrderSystem.Order.API.Models.DTOs;
using OrderSystem.Order.API.Models.DTOs.Order;
using OrderSystem.Order.API.Services.Interfaces;

namespace OrderSystem.Order.API.Services
{
    public class OrderService : IOrderService
    {
        private OrderSystemDbContext _dbContext;
        private RpcClient _rpcClient;
        public OrderService(OrderSystemDbContext dbContext)
        {
            _dbContext = dbContext;
            _rpcClient = new RpcClient("http://payment_api:8000/");
        }

        /*
         * Cria um pedido e chama o cliente rpc que chama o método de processar pagamento do servidor rpc, atualizando após alguns segundos
         * o status da compra no banco para "Pagamento realizado com sucesso"
         */
        public async Task<Result> CreateOrder(OrderRequest order, int userId)
        {
            Models.Order createdOrder = new Models.Order()
            {
                Price = order.Price,
                Description = order.Description,
                Status = "Aguardando pagamento",
                UserId = userId,
            };

            await _dbContext.Orders.AddAsync(createdOrder);
            await _dbContext.SaveChangesAsync();

            try
            {
                await _rpcClient.Call("ProcessPayment", [createdOrder.Id]);
            }
            catch (Exception)
            {
                createdOrder.Status = "Falha no processamento do pagamento";
                await _dbContext.SaveChangesAsync();
            }

            var client = new OrderClient();

            await client.SendOrderAsync(createdOrder.Id, (double) createdOrder.Price, createdOrder.Description, createdOrder.Status);

            return new Result
            {
                Success = true,
                Message = "Pedido cadastrado com sucesso.",
                Data = new OrderViewModel()
                {
                    Id = createdOrder.Id,
                    Price = createdOrder.Price,
                    Description = createdOrder.Description,
                    Status = createdOrder.Status,        
                    UserId = createdOrder.UserId,
                }
            };
        }

        /*
         * Retorna todos os pedidos associados a um id de usuário
         */
        public Result RetrieveAllOrdersByUser(int userId)
        {
            var orders = _dbContext.Orders
                .Where(order => order.UserId == userId)
                .Select(order => new OrderViewModel() {
                    Id = order.Id,
                    Price = order.Price,
                    Description = order.Description,
                    Status = order.Status,  
                    UserId = order.UserId
                })
                .ToList();

            if (orders == null)
            {
                return new Result
                {
                    Success = true,
                    Message = "Nenhum pedido encontrado.",
                    Data = new List<OrderViewModel>()
                };
            }

            return new Result
            {
                Success = true,
                Message = "Todos os pedidos do usuário foram retornados com sucesso.",
                Data = orders
            };
        }
    }
}
