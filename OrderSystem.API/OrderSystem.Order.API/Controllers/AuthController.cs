using Microsoft.AspNetCore.Mvc;
using OrderSystem.Order.API.Models.DTOs;
using OrderSystem.Order.API.Services.Interfaces;
using LoginRequest = OrderSystem.Order.API.Models.DTOs.Auth.LoginRequest;

namespace OrderSystem.Order.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginRequest login)
        {
            try
            {
                var result = await authService.Login(login);

                if (result.Success)
                    return Ok(result);

                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest(new { success = false, message = "Error ao tentar fazer o login" });
            }
        }
    }
}