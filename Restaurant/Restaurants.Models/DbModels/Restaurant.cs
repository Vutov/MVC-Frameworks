namespace Restaurants.Models.DbModels
{
    using System.Collections.Generic;

    public class Restaurant
    {
        private ICollection<Meal> _meals;
        private ICollection<Rating> _ratings;

        public Restaurant()
        {
            this._meals = new HashSet<Meal>();
            this._ratings = new HashSet<Rating>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Rating> Ratings
        {
            get { return this._ratings; }
            set { this._ratings = value; }
        }

        public virtual ICollection<Meal> Meals
        {
            get { return this._meals; }
            set { this._meals = value; }
        }

        public int TownId { get; set; }

        public virtual Town Town { get; set; }

        public string OwnerId { get; set; }

        public virtual ApplicationUser Owner { get; set; }
    }
}
