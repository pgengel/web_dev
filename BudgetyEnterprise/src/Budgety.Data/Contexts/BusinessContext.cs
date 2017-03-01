using EnterpriseAngular2.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EnterpriseAngular2.Data.Contexts
{
    public sealed class BusinessContext : IDisposable, IBusinessContext
    {
        private readonly DataContext _context;
        private bool _dispose;
        public BusinessContext()
        {
            _context = new DataContext();
        }

        public DataContext DataContext
        {
            get { return _context; }
        }

        public bool CreateCustomer(Customer customer)
        {
            Check.Require(customer.Email);
            Check.Require(customer.FirstName);
            Check.Require(customer.LastName);

            customer.Id = _context.Customers.Count();

            _context.Customers.Add(customer);
            _context.SaveChanges();
            return true;

        }

        public bool UpdateCustomer(Customer customer)
        {
            Customer entity = _context.Customers.Find(customer.Id);

            if (entity == null)
            {
                throw new NotImplementedException("Need to handle this!");
                return false;
            }

            _context.Entry(customer).CurrentValues.SetValues(customer);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteCustomer(Customer customer)
        {

            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return true;
        }

        public ICollection<Customer> GetCustomerList()
        {
            return _context.Customers.OrderBy(p => p.Id).ToArray();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (_dispose || disposing)
            {
                return;
            }

            if (_context != null)
            {
                _context.Dispose();
            }

            _dispose = true;
        }

        static class Check
        {
            public static void Require(string value)
            {
                if (value == null)
                    throw new ArgumentNullException();
                else if (value.Trim().Length == 0)
                    throw new ArgumentNullException();
            }



        }
    }


}
