namespace Restaurants.Services
{
    using System.Linq;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;
    using AutoMapper;
    using Common;
    using Handlers;
    using Infrastructure;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Practices.Unity;
    using Models.DbModels;
    using Models.ViewModels;

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            this.RegisterDependencies();
            this.ConfigureMapping();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            GlobalConfiguration.Configuration.MessageHandlers.Add(new OptionsHttpMessageHandler());
        }

        private void RegisterDependencies()
        {
            Injector.Instance.RegisterType<IUserIdProvider, AspNetUserIdProvider>();
        }

        public void ConfigureMapping()
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
        }
    }
}
