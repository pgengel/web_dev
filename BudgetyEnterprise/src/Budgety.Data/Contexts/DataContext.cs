using EnterpriseAngular2.Data.Models;
using System.Data.Entity;

namespace EnterpriseAngular2.Data.Contexts
{
    public class DataContext : DbContext
    {
        public DataContext() : base("Default")
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
