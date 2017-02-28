using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Budgety.Data.Models;

namespace Budgety.Data.Contexts
{
    public interface IBudgetContext
    {
        bool CreateBudget(Customer customer);
        bool DeleteBudget(Customer customer);
        bool UpdateBudget(Customer customer);
        ICollection<Customer> GetBudgets();
        Customer GetBudget(int Id);
    }
}
