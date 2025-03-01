namespace OrderSystem.Order.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public Order() { }
    }
}
