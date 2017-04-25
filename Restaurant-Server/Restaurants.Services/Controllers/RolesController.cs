namespace Restaurants.Services.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http;
    using Data;
    using Data.DataLayer;
    using Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.Owin;
    using Models.ViewModels;
    using Providers;

    [RoutePrefix("api/roles")]
    public class RolesController : BaseController
    {
        private ApplicationRoleManager _appRoleManager;

        public RolesController()
        {
        }

        // TODO injector
        public RolesController(ApplicationRoleManager applicationRoleManager) : base(new RestaurantData(new RestaurantsContext()), new AspNetUserIdProvider())
        {
            AppRoleManager = applicationRoleManager;
        }

        protected ApplicationRoleManager AppRoleManager
        {
            get { return this._appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>(); }
            private set { this._appRoleManager = value; }
        }

        [Route("my")]
        [Authorize]
        public IHttpActionResult GetUserRoles()
        {
            var loggedUserID = this.UserIdProvider.GetUserId();

            var roles = this.Data.ApplicationUsers.GetById(loggedUserID).Roles;
            var rolesViewModel = roles.AsQueryable()
                .Select(role => this.AppRoleManager.FindById(role.RoleId))
                .Select(RolesViewModel.Create)
                .OrderBy(r => r.Name);

            return Ok(rolesViewModel);
        }
    }
}