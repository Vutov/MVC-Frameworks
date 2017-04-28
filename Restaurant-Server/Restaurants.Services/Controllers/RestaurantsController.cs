namespace Restaurants.Services.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using Models.BindingModels;
    using Models.DbModels;
    using Models.ViewModels;

    [RoutePrefix("api/restaurants")]
    public class RestaurantsController : BaseController
    {
        [Route("")]
        public IHttpActionResult GetRestaurant(int restaurantId)
        {
            var restourant = this.Data.Restaurants.GetById(restaurantId);
            if (restourant == null)
            {
                return this.NotFound();
            }

            var viewModel = Mapper.Map<RestaurantViewModel>(restourant);
            return this.Ok(viewModel);
        }

        [Route("")]
        public IHttpActionResult GetRestaurantsByTown(int townId)
        {
            var restourants = this.Data.Towns.GetById(townId);
            if (restourants == null)
            {
                return this.Ok(new List<RestaurantViewModel>());
            }

            var viewModel = restourants.Restaurants.AsEnumerable()
                .Select(Mapper.Map<RestaurantViewModel>)
                .OrderByDescending(r => r.Rating)
                .ThenBy(r => r.Name);
            return this.Ok(viewModel);
        }

        [Route("")]
        [Authorize]
        public IHttpActionResult PostNewRestaurant([FromBody] CreateRestaurantBindingModel model)
        {
            if (model == null)
            {
                return this.BadRequest();
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var town = this.Data.Towns.GetById(model.TownId);
            if (town == null)
            {
                return this.BadRequest("Town with id " + model.TownId + " does not exit!");
            }

            var ownerId = this.UserIdProvider.GetUserId();
            var owner = this.Data.ApplicationUsers.GetById(ownerId);
            var restaurant = new Restaurant()
            {
                Name = model.Name,
                Owner = owner,
                Meals = new List<Meal>(),
                Ratings = new List<Rating>(),
            };

            town.Restaurants.Add(restaurant);
            this.Data.SaveChanges();

            var viewModel = Mapper.Map<RestaurantViewModel>(restaurant);
            return this.Created("api/restaurants/" + town.Id, viewModel);
        }

        [Route("{id}/rate")]
        public IHttpActionResult PostRateExistingRestaurant([FromUri] int id, [FromBody] RatingBindingModel model)
        {
            if (model == null)
            {
                return this.BadRequest();
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var restaurant = this.Data.Restaurants.GetById(id);
            if (restaurant == null)
            {
                return this.NotFound();
            }

            var userId = this.UserIdProvider.GetUserId();
            if (restaurant.OwnerId == userId)
            {
                return this.BadRequest("Cannot rate your own restaurant!");
            }

            if (restaurant.Ratings.Any(r => r.UserId == userId))
            {
                var currentRating = restaurant.Ratings.First(r => r.UserId == userId);
                currentRating.Stars = model.Stars;
                this.Data.SaveChanges();
                return this.Ok();
            }

            var user = this.Data.ApplicationUsers.GetById(userId);
            var rating = new Rating()
            {
                Stars = model.Stars,
                User = user
            };

            restaurant.Ratings.Add(rating);
            this.Data.SaveChanges();
            return this.Ok();
        }

        [Route("{id}/meals")]
        public IHttpActionResult GetRestaurantMeals([FromUri] int id)
        {
            var restaurant = this.Data.Restaurants.GetById(id);
            if (restaurant == null)
            {
                return this.NotFound();
            }

            var viewModel = restaurant.Meals.AsEnumerable()
                .Select(Mapper.Map<MealViewModel>)
                .OrderBy(m => m.Type)
                .ThenBy(m => m.Name);
            return this.Ok(viewModel);
        }

        [Route("towns")]
        public IHttpActionResult GetTownsForRestaurants()
        {
            var towns = this.Data.Towns.All();

            var viewModel = towns.AsEnumerable()
                .Select(Mapper.Map<TownViewModel>)
                .OrderBy(m => m.Id)
                .ThenBy(m => m.Name);

            return this.Ok(viewModel);
        }

        [Route("")]
        public IHttpActionResult GetRestaurants()
        {
            var restaurants = this.Data.Restaurants.All();

            var viewModel = restaurants.AsEnumerable()
                .Select(Mapper.Map<RestaurantViewModel>)
                .OrderBy(m => m.Id)
                .ThenBy(m => m.Name);

            return this.Ok(viewModel);
        }
    }
}
