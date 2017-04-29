﻿namespace Restaurants.Services.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using Microsoft.AspNet.Identity;
    using Models.BindingModels;
    using Models.DbModels;
    using Models.ViewModels;

    [RoutePrefix("api/meals")]
    public class MealsController : BaseController
    {
        [Route("")]
        [Authorize]
        public IHttpActionResult PostNewMeal([FromBody] MealBindingModel model)
        {
            if (model == null)
            {
                return this.BadRequest();
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var restaurant = this.Data.Restaurants.GetById(model.RestaurantId);
            if (restaurant == null)
            {
                return this.BadRequest("Restaurant with id " + model.RestaurantId + " does not exist!");
            }

            var mealType = this.Data.MealTypes.GetById(model.TypeId);
            if (mealType == null)
            {
                return this.BadRequest("Meal type with id " + model.TypeId + " does not exist!");
            }

            var meal = new Meal()
            {
                Name = model.Name,
                Price = model.Price,
                Type = mealType
            };

            restaurant.Meals.Add(meal);
            this.Data.SaveChanges();

            var viewModel = Mapper.Map<MealViewModel>(meal);
            return this.Created("/api/meals/" + meal.Id, viewModel);
        }

        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteMeal([FromUri] int id)
        {
            var meal = this.Data.Meals.GetById(id);
            if (meal == null)
            {
                return this.NotFound();
            }

            var userId = this.User.Identity.GetUserId();
            if (meal.Restaurant.OwnerId != userId)
            {
                return this.Unauthorized();
            }

            this.Data.Meals.Delete(meal);
            this.Data.SaveChanges();

            var viewModel = new MessageViewModel()
            {
                Message = "Meal #" + id + " deleted."
            };

            return this.Ok(viewModel);
        }

        [Route("{id}")]
        [Authorize]
        public IHttpActionResult PutEditMeal([FromUri] int id, [FromBody] EditMealBindingModel model)
        {
            var meal = this.Data.Meals.GetById(id);
            if (meal == null)
            {
                return this.NotFound();
            }

            var userId = this.User.Identity.GetUserId();
            if (meal.Restaurant.OwnerId != userId)
            {
                return this.Unauthorized();
            }

            if (model == null)
            {
                return this.BadRequest();
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var type = this.Data.MealTypes.GetById(model.TypeId);
            if (type == null)
            {
                return this.BadRequest("Meal type with id " + model.TypeId + " does not exist!");
            }

            meal.Name = model.Name;
            meal.Price = model.Price;
            meal.Type = type;
            this.Data.SaveChanges();

            var viewModel = Mapper.Map<MealViewModel>(meal);

            return this.Ok(viewModel);
        }

        [Route("types")]
        public IHttpActionResult GetMealTypes()
        {
            var types = this.Data.MealTypes.All();
            var viewModel = types.AsEnumerable()
                .Select(Mapper.Map<MealTypeViewModel>)
                .OrderBy(m => m.Id);

            return this.Ok(viewModel);
        }
    }
}
