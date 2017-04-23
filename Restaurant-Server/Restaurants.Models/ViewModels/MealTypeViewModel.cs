namespace Restaurants.Models.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using DbModels;

    public class MealTypeViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public static Expression<Func<MealType, MealTypeViewModel>> Create
        {
            get
            {
                return meal => new MealTypeViewModel()
                {
                    Id = meal.Id,
                    Name = meal.Name
                };
            }
        }
    }
}
