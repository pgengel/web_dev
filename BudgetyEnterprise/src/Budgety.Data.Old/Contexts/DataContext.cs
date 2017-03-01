using Budgety.Data.Models;
using System.Data.Entity;

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
