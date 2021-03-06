﻿namespace Restaurants.Services.Controllers
{
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http;
    using AutoMapper;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.AspNet.Identity.Owin;
    using Models.BindingModels;
    using Models.ViewModels;
    using Providers;

    [RoutePrefix("api/roles")]
    public class RolesController : BaseController
    {
        private ApplicationRoleManager _appRoleManager;

        public RolesController()
        {
        }

        public RolesController(ApplicationRoleManager applicationRoleManager)
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
            var rolesViewModel = roles
                .AsQueryable()
                .Select(role => this.AppRoleManager.FindById(role.RoleId))
                .OrderBy(r => r.Name)
                .AsEnumerable()
                .Select(Mapper.Map<RolesViewModel>);

            return Ok(rolesViewModel);
        }

        [Route("users")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult GetUsers()
        {
            var users = this.Data.ApplicationUsers.All();
            var usersViewModel = users.AsEnumerable()
                .Select(Mapper.Map<UserViewModel>)
                .OrderBy(u => u.Username);

            return this.Ok(usersViewModel);
        }

        [Route("give/admin")]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult GiveRole([FromBody] GiveAdminBindingModel model)
        {
            if (model == null)
            {
                return this.BadRequest();
            }

            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState);
            }

            var user = this.Data.ApplicationUsers.All().FirstOrDefault(u => u.UserName == model.Name && u.Email == model.Email);
            if (user == null)
            {
                return this.BadRequest("User not found!");
            }

            var role = this.AppRoleManager.FindByName("Admin");
            if (user.Roles.Any(r => r.RoleId == role.Id))
            {
                return this.BadRequest("User is already admin");
            }

            user.Roles.Add(new IdentityUserRole { RoleId = role.Id, UserId = user.Id });
            this.Data.SaveChanges();

            return this.Ok();
        }
    }
}