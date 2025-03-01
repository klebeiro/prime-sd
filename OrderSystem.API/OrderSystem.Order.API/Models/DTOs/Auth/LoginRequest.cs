namespace OrderSystem.Order.API.Models.DTOs.Auth
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public LoginRequest() { }
    }
}
