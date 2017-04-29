namespace Restaurants.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Diagnostics;
    using System.Linq;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models.DbModels;

    internal sealed class Configuration : DbMigrationsConfiguration<RestaurantsContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(RestaurantsContext context)
        {
            if (!context.Towns.Any())
            {
                this.SeedTowns(context);
            }

            if (!context.MealTypes.Any())
            {
                this.SeedMealTypes(context);
            }

            if (!context.Users.Any())
            {
                this.SeedUsersAndRoles(context);
            }
        }

        private void SeedUsersAndRoles(RestaurantsContext context)
        {
            this.SeedUser(context, roleName: "Admin", userName: "admin");
            this.SeedUser(context, roleName: "User", userName: "user");
            context.SaveChanges();
        }

        private void SeedUser(RestaurantsContext context, string roleName, string userName)
        {
            var role = context.Roles.FirstOrDefault(r => r.Name == roleName);
            if (role == null)
            {
                role = new IdentityRole {Name = roleName, Id = Guid.NewGuid().ToString()};
                context.Roles.Add(role);
            }

            var hasher = new PasswordHasher();

            var user = new ApplicationUser()
            {
                UserName = userName,
                PasswordHash = hasher.HashPassword(userName),
                Email = $"{userName}@{userName}.com",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            user.Roles.Add(new IdentityUserRole {RoleId = role.Id, UserId = user.Id});
            context.Users.Add(user);
        }

        private void SeedMealTypes(RestaurantsContext context)
        {
            var mealTypes = new[]
            {
                new MealType {Name = "Salad", Order = 10},
                new MealType {Name = "Soup", Order = 20},
                new MealType {Name = "Main", Order = 30},
                new MealType {Name = "Dessert", Order = 40}
            };

            foreach (var mealType in mealTypes)
            {
                context.MealTypes.Add(mealType);
            }

            context.SaveChanges();
        }

        private void SeedTowns(RestaurantsContext context)
        {
            var towns = new[]
            {
                new Town {Name = "Plovdiv"},
                new Town {Name = "Sofia"},
                new Town {Name = "Pernik"},
                new Town {Name = "Burgas"},
                new Town {Name = "Kurtovo Konare"}
            };

            foreach (var town in towns)
            {
                context.Towns.Add(town);
            }

            context.SaveChanges();
        }
    }
}
