using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Budgety.Data.Models;

namespace Budgety.Data
{
    public class DataContext : DbContext
    {
        public DataContext() : base("Default")
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
