using System.Collections.Generic;
using Budgety.Data.Models;

namespace Budgety.Data.Contexts
{
    public interface IBusinessContext
    {
        bool CreateCustomer(Customer customer);
        bool DeleteCustomer(Customer customer);
        bool UpdateCustomer(Customer customer);
        ICollection<Customer> GetCustomerList();
    }
}
