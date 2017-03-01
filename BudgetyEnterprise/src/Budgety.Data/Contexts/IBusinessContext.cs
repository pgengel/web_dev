using EnterpriseAngular2.Data.Models;
using System.Collections.Generic;

namespace EnterpriseAngular2.Data.Contexts
{
    public interface IBusinessContext
    {
        bool CreateCustomer(Customer customer);
        bool DeleteCustomer(Customer customer);
        bool UpdateCustomer(Customer customer);
        ICollection<Customer> GetCustomerList();
    }
}
