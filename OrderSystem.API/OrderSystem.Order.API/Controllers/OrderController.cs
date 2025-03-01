using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using OrderSystem.Order.API.Models.DTOs;
using OrderSystem.Order.API.Models;
using OrderSystem.Order.API.Services.Interfaces;
using OrderSystem.Order.API.Services;
using OrderSystem.Order.API.Models.DTOs.Order;
using OrderSystem.Order.API.Models.DTOs.User;

namespace OrderSystem.Order.API.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateOrder([FromBody] OrderRequest order)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if(currentUserId == null || !int.TryParse(currentUserId, out _))
            {
                return BadRequest();
            }

            var result = await orderService.CreateOrder(order, int.Parse(currentUserId));

            if (result.Success == false)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        public ActionResult RetrieveAllOrdersByUser()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (currentUserId == null || !int.TryParse(currentUserId, out _))
            {
                return BadRequest();
            }

            var result = orderService.RetrieveAllOrdersByUser(int.Parse(currentUserId));

            if (result.Success == false)
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}
