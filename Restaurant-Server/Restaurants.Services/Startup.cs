using Microsoft.Owin;
using Restaurants.Services;

[assembly: OwinStartup(typeof(Startup))]

namespace Restaurants.Services
{
    using Common;
    using Infrastructure;
    using Microsoft.Practices.Unity;
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            this.RegisterDependencies();
            ConfigureAuth(app);
        }

        private void RegisterDependencies()
        {
            Injector.Instance.RegisterType<IUserIdProvider, AspNetUserIdProvider>();
        }
    }
}
