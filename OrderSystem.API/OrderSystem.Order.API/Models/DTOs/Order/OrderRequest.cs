namespace OrderSystem.Order.API.Models.DTOs.Order
{
    public class OrderRequest
    {
        public decimal Price { get; set; }
        public string Description { get; set; }
        public OrderRequest() { }
    }
}
