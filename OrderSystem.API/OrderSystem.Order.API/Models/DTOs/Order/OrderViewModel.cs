namespace OrderSystem.Order.API.Models.DTOs.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public OrderViewModel() { }
    }
}
