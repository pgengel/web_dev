using Budgety.Data.Models;
using System.Collections.Generic;

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
