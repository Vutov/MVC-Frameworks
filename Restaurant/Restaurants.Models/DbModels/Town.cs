namespace Restaurants.Models.DbModels
{
    using System.Collections.Generic;

    public class Town
    {
        private ICollection<Restaurant> _restaurants;

        public Town()
        {
            this._restaurants = new HashSet<Restaurant>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Restaurant> Restaurants
        {
            get { return this._restaurants; }
            set { this._restaurants = value; }
        }
    }
}
