using System.Data.Entity;
using Budgety.Data.Models;

namespace Budgety.Data.Contexts
{
    public class DataContext : DbContext
    {
        public DataContext() : base("Default")
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
