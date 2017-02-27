using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budgety.Data.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ItemsExp { get; set; }
        public string ItemsInc { get; set; }
        public string TotalExp { get; set; }
        public string TotalInc { get; set; }
        public string Budget { get; set; }
        public string Percent { get; set; }
    }
}
