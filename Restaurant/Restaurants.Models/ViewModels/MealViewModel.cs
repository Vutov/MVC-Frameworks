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

        // TODO Automapper
        public static Expression<Func<Meal, MealViewModel>> Create
        {
            get
            {
                return meal => new MealViewModel()
                {
                    Id = meal.Id,
                    Name = meal.Name,
                    Price = meal.Price,
                    Type = meal.Type.Name
                };
            }
        }
    }
}