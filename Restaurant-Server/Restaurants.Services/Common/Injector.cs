namespace Restaurants.Services.Common
{
    using System.Configuration;
    using Microsoft.Practices.Unity;
    using Microsoft.Practices.Unity.Configuration;

    public class Injector
    {
        public static IUnityContainer Instance { get; private set; }

        static Injector()
        {
            var container = new UnityContainer();

            var section = (UnityConfigurationSection)ConfigurationManager.GetSection("unity");
            section?.Configure(container);
            Instance = container;
        }
    }
}