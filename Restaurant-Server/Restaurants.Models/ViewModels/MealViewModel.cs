namespace Restaurants.Models.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using DbModels;

    public class MealViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Type { get; set; }
    }
}