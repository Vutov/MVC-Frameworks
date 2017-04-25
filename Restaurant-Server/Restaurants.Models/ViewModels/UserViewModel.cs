namespace Restaurants.Models.ViewModels
{
    using System;
    using System.Linq.Expressions;
    using DbModels;

    public class UserViewModel
    {
        public string ID { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public static Expression<Func<ApplicationUser, UserViewModel>> Create
        {
            get
            {
                return r => new UserViewModel()
                {
                    ID = r.Id,
                    Username = r.UserName,
                    Email = r.Email
                };
            }
        }
    }
}
