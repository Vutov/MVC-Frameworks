namespace Restaurants.Models.ViewModels
{
    public class RestaurantViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double? Rating { get; set; }

        public TownViewModel Town { get; set; }
    }
}