namespace Restaurants.Models.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class RolesViewModel
    {
        public string Name { get; set; }

        public static Expression<Func<IdentityRole, RolesViewModel>> Create
        {
            get
            {
                return r => new RolesViewModel()
                {
                    Name = r.Name
                };
            }
        }
    }
}
