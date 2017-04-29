namespace Restaurants.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using AutoMapper;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Owin.Testing;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Owin;
    using Data;
    using Microsoft.Practices.Unity;
    using Models;
    using Restaurants.Models.DbModels;
    using Restaurants.Models.ViewModels;
    using Services;
    using Services.Common;
    using Services.Infrastructure;

    [TestClass]
    public class MealsIntegrationTests
    {
        private const string Username = "testUser";
        private const string Password = "Abc123$";

        private static TestServer httpTestServer;
        private static HttpClient httpClient;
        private string accessToken;

        public string AccessToken
        {
            get
            {
                if (this.accessToken == null)
                {
                    var loginResponse = this.Login();
                    Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);

                    var loginData = loginResponse.Content.ReadAsAsync<LoginDto>().Result;
                    Assert.IsNotNull(loginData.Access_Token);

                    this.accessToken = loginData.Access_Token;
                }

                return this.accessToken;
            }
        }

        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Meal, MealViewModel>()
                    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.Name));
                cfg.CreateMap<Order, OrdersViewModel>()
                    .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.OrderStatus))
                    .ForMember(dest => dest.Meal, opt => opt.ResolveUsing(src => Mapper.Map<MealViewModel>(src.Meal)));
                cfg.CreateMap<Town, TownViewModel>();
                cfg.CreateMap<Restaurant, RestaurantViewModel>()
                    .ForMember(dest => dest.Rating, opt => opt.ResolveUsing(src => src.Ratings.Count == 0 ? 0 : src.Ratings.Select(ra => ra.Stars).Average()));
                cfg.CreateMap<IdentityRole, RolesViewModel>();
                cfg.CreateMap<MealType, MealTypeViewModel>();
                cfg.CreateMap<ApplicationUser, UserViewModel>()
                        .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.Id))
                        .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName));
            });

            Injector.Instance.RegisterType<IUserIdProvider, AspNetUserIdProvider>();

            ClearDatabase();

            httpTestServer = TestServer.Create(appBuilder =>
            {
                var config = new HttpConfiguration();
                WebApiConfig.Register(config);
                var startup = new Startup();

                startup.Configuration(appBuilder);
                appBuilder.UseWebApi(config);
            });

            httpClient = httpTestServer.HttpClient;

            SeedDatabase();
        }

        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            httpTestServer?.Dispose();

            ClearDatabase();
        }

        [TestMethod]
        public void EditMeal_WhenLoggedWithProperUserAndAllDataIsValid_ShouldReturnOkAndEditedMeal()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", "Edited"),
                new KeyValuePair<string, string>("typeId", "1"),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Valid 1");
            Assert.IsNotNull(meal);

            // Act
            var response = this.EditMealByIdLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            var returnedMeal = response.Content.ReadAsAsync<MealViewModel>().Result;
            Assert.AreEqual(returnedMeal.Name, "Edited");
            var type = context.MealTypes.First(t => t.Id == 1);
            Assert.AreEqual(returnedMeal.Type, type.Name);
            Assert.AreEqual(returnedMeal.Price, 5.10m);
        }

        [TestMethod]
        public void EditMeal_WhenLoggedWithInvalidId_ShouldReturn404()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", "Edited"),
                new KeyValuePair<string, string>("typeId", "1"),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Id == int.MaxValue);
            Assert.IsNull(meal);

            // Act
            var response = this.EditMealByIdLogged(int.MaxValue, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [TestMethod]
        public void EditMeal_WhenNotLogged_ShouldReturn401()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", "Edited"),
                new KeyValuePair<string, string>("typeId", "1"),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Valid 2");
            Assert.IsNotNull(meal);

            // Act
            var response = this.EditMealByIdNotLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public void EditMeal_WhenNotRestourantOwner_ShouldReturn401()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", "Edited"),
                new KeyValuePair<string, string>("typeId", "1"),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Invdalid");
            Assert.IsNotNull(meal);
            Assert.IsTrue(meal.Restaurant.Owner.UserName != Username);

            // Act
            var response = this.EditMealByIdLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [TestMethod]
        public void EditMeal_WhenLoggedWithInvalidMealName_ShouldReturn400BadRequest()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", ""),
                new KeyValuePair<string, string>("typeId", "1"),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Valid 2");
            Assert.IsNotNull(meal);

            // Act
            var response = this.EditMealByIdLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public void EditMeal_WhenLoggedWithInvalidData_ShouldReturn400BadRequest()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Valid 2");
            Assert.IsNotNull(meal);

            // Act
            var response = this.EditMealByIdLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [TestMethod]
        public void EditMeal_WhenLoggedWithInvalidTypeId_ShouldReturn400BadRequest()
        {
            // Arrange
            var data = new FormUrlEncodedContent(new[]
            {
                 new KeyValuePair<string, string>("name", "Edited"),
                new KeyValuePair<string, string>("typeId", int.MaxValue.ToString()),
                new KeyValuePair<string, string>("Price", "5.10"),
            });
            var context = new RestaurantsContext();
            var meal = context.Meals.FirstOrDefault(m => m.Name == "Valid 2");
            Assert.IsNotNull(meal);
            var mealType = context.MealTypes.FirstOrDefault(m => m.Id == int.MaxValue);
            Assert.IsNull(mealType);

            // Act
            var response = this.EditMealByIdLogged(meal.Id, data);

            // Assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        private static void SeedDatabase()
        {
            var context = new RestaurantsContext();
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new ApplicationUserManager(userStore);

            var user = new ApplicationUser()
            {
                Id = "1",
                UserName = Username,
                Email = Username
            };

            var result = userManager.CreateAsync(user, Password).Result;
            if (!result.Succeeded)
            {
                Assert.Fail(string.Join(Environment.NewLine, result.Errors));
            }

            SeedMeals(context);
        }

        private static void ClearDatabase()
        {
            var context = new RestaurantsContext();
            var restourans = context.Restaurants.ToList();
            while (restourans.Count != 0)
            {
                var restorant = restourans[restourans.Count - 1];
                restourans.Remove(restorant);
                context.Restaurants.Remove(restorant);
            }

            var users = context.Users.ToList();
            while (users.Count != 0)
            {
                var user = users[users.Count - 1];
                users.Remove(user);
                context.Users.Remove(user);
            }

            var meals = context.Meals.ToList();
            while (meals.Count != 0)
            {
                var meal = meals[meals.Count - 1];
                meals.Remove(meal);
                context.Meals.Remove(meal);
            }

            context.SaveChanges();
        }

        private static void SeedMeals(RestaurantsContext context)
        {
            var restourant = new Restaurant()
            {
                Name = "Seed restaurant",
                OwnerId = "1",
                Ratings = new List<Rating>(),
                Town = new Town() { Id = 1, Name = "Town" }
            };

            context.Meals.Add(new Meal()
            {
                Name = "Valid 1",
                Price = 1,
                Restaurant = restourant,
                Type = new MealType()
                {
                    Name = "Type 1"
                }
            });

            context.Meals.Add(new Meal()
            {
                Name = "Valid 2",
                Price = 2,
                Restaurant = restourant,
                Type = new MealType()
                {
                    Name = "Type 2"
                }
            });

            context.Meals.Add(new Meal()
            {
                Name = "Invdalid",
                Price = 2,
                Restaurant = new Restaurant()
                {
                    Name = "Seed restaurant2",
                    Owner = new ApplicationUser() { UserName = "second", PasswordHash = "212" },
                    Ratings = new List<Rating>(),
                    Town = new Town() { Id = 2, Name = "Town2" }
                },
                Type = new MealType()
                {
                    Name = "Type 2"
                }
            });
            context.SaveChanges();
        }

        private HttpResponseMessage Login()
        {
            var loginData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("username", Username),
                new KeyValuePair<string, string>("password", Password),
                new KeyValuePair<string, string>("grant_type", "password"),
            });

            var response = httpClient.PostAsync("api/account/login", loginData).Result;

            return response;
        }

        private void AddAuthenticationToken()
        {
            if (!httpClient.DefaultRequestHeaders.Contains("Authorization"))
            {
                httpClient.DefaultRequestHeaders
                    .Add("Authorization", "Bearer " + this.AccessToken);
            }
        }

        private void RemoveAuthenticatioToken()
        {
            if (httpClient.DefaultRequestHeaders.Contains("Authorization"))
            {
                httpClient.DefaultRequestHeaders
                    .Remove("Authorization");
            }
        }

        private HttpResponseMessage EditMealByIdLogged(int id, FormUrlEncodedContent data)
        {
            this.AddAuthenticationToken();

            return httpClient.PutAsync("/api/meals/" + id, data).Result;
        }

        private HttpResponseMessage EditMealByIdNotLogged(int id, FormUrlEncodedContent data)
        {
            this.RemoveAuthenticatioToken();

            return httpClient.PutAsync("/api/meals/" + id, data).Result;
        }
    }
}
