using Microsoft.Owin;
using Restaurants.Services;

[assembly: OwinStartup(typeof(Startup))]

namespace Restaurants.Services
{
    using System.Linq;
    using AutoMapper;
    using Common;
    using Infrastructure;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.Practices.Unity;
    using Models.DbModels;
    using Models.ViewModels;
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            this.RegisterDependencies();
            this.ConfigureMapping();
            this.ConfigureAuth(app);
        }

        private void RegisterDependencies()
        {
            Injector.Instance.RegisterType<IUserIdProvider, AspNetUserIdProvider>();
        }

        private void ConfigureMapping()
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
