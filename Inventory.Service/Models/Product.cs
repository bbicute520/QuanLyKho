namespace Inventory.Service.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public string Unit { get; set; } = "";
        public int Stock { get; set; } = 0;
        public int MinStock { get; set; } = 10;
    }
}