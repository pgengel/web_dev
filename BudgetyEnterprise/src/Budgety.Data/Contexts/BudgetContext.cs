using Budgety.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Budgety.Data.Contexts
{
    public sealed class BudgetContext : IDisposable, IBudgetContext
    {
        private readonly DataContext _context;
        private bool _dispose;
        public BudgetContext()
        {
            _context = new DataContext();
        }

        public DataContext DataContext
        {
            get { return _context; }
        }


        public bool CreateBudget(Customer customer)
        {

            Check.Require(customer.FirstName);

            customer.Id = _context.Customers.Count();

            _context.Customers.Add(customer);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteBudget(Customer customer)
        {
            Customer entity = _context.Customers.Find(customer.Id);

            if (entity == null)
            {
                //throw new NotImplementedException("Need to handle this!");
                return false;
            }
            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateBudget(Customer customer)
        {
            Customer entity = _context.Customers.Find(customer.Id);

            if (entity == null)
            {
                //throw new NotImplementedException("Need to handle this!");
                return false;
            }

            _context.Entry(customer).CurrentValues.SetValues(customer);
            _context.SaveChanges();
            return true;
        }

        public ICollection<Customer> GetBudgets()
        {
            return _context.Customers.OrderBy(p => p.Id).ToArray();
        }
        public Customer GetBudget(int Id)
        {
            Customer entity = _context.Customers.Find(Id);

            if (entity == null)
            {
                throw new NotImplementedException("Need to handle this!");

            }

            return entity;
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
