namespace Restaurants.Models.ViewModels
{
    using System;
    using DbModels;

    public class OrdersViewModel
    {
        public int Id { get; set; }

        public MealViewModel Meal { get; set; }

        public int Quantity { get; set; }

        public OrderStatus Status { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}