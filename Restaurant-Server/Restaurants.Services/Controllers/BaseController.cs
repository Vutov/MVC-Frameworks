namespace Restaurants.Services.Controllers
{
    using System.Web.Http;
    using Common;
    using Data.DataLayer;
    using Infrastructure;
    using Microsoft.Practices.Unity;

    public class BaseController : ApiController
    {
        public BaseController()
        {
            this.Data = Injector.Instance.Resolve<IRestaurantData>();
            this.UserIdProvider = Injector.Instance.Resolve<IUserIdProvider>();
        }

        public BaseController(IRestaurantData data, IUserIdProvider idProvider)
        {
            this.Data = data;
            this.UserIdProvider = idProvider;
        }

        protected IRestaurantData Data { get; set; }

        protected IUserIdProvider UserIdProvider { get; set; }
    }
}
