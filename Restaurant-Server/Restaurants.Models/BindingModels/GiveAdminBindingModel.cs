namespace Restaurants.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class GiveAdminBindingModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
