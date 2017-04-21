namespace Restaurants.Models.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using DbModels;

    public class TownViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public static Expression<Func<Town, TownViewModel>> Create
        {
            get
            {
                return r => new TownViewModel()
                {
                    Id = r.Id,
                    Name = r.Name
                };
            }
        }
    }
}