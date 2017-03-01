using System.ComponentModel.DataAnnotations.Schema;

namespace Budgety.Data.Models
{
    public class Customer
    {
        //[Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public string ItemsExp { get; set; }
        [NotMapped]
        public string ItemsInc { get; set; }
        [NotMapped]
        public string TotalExp { get; set; }
        [NotMapped]
        public string TotalInc { get; set; }
        [NotMapped]
        public string Budget { get; set; }
        [NotMapped]
        public string Percent { get; set; }
    }
}
