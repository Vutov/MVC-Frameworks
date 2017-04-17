namespace Restaurants.Data.DataLayer
{
    using System;
    using System.Collections.Generic;
    using Models.DbModels;
    using Repositories;

    public class RestaurantData : IRestaurantData
    {
        private readonly IDictionary<Type, object> _repositories;

        public RestaurantData(RestaurantsContext context)
        {
            this.Context = context;
            this._repositories = new Dictionary<Type, object>();
        }

        public RestaurantsContext Context { get; }

        public IRepository<ApplicationUser> ApplicationUsers => this.GetRepository<ApplicationUser>();

        public IRepository<Rating> Ratings => this.GetRepository<Rating>();

        public IRepository<Town> Towns => this.GetRepository<Town>();

        public IRepository<Restaurant> Restaurants => this.GetRepository<Restaurant>();

        public IRepository<Meal> Meals => this.GetRepository<Meal>();

        public IRepository<MealType> MealTypes => this.GetRepository<MealType>();

        public IRepository<Order> Orders => this.GetRepository<Order>();

        public int SaveChanges()
        {
            return this.Context.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            var modelType = typeof(T);
            if (!this._repositories.ContainsKey(modelType))
            {
                var repositoryType = typeof(Repository<T>);
                this._repositories.Add(modelType, Activator.CreateInstance(repositoryType, this.Context));
            }

            return (IRepository<T>)this._repositories[modelType];
        }
    }
}