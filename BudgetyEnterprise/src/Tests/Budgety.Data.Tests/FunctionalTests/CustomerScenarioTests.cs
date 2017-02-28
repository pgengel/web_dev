using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Budgety.Data.Contexts;
using Budgety.Data.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Budgety.Data.Tests.FunctionalTests
{
    [TestClass]
    public class CustomerScenarioTest : DatabaseScenarioTests
    {
        [TestMethod]
        public void CreateCustomer_StoredInDataStore()
        {
            using (var bc = new BudgetContext())
            {

                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = "Anderson"
                };

                bc.CreateBudget(customer);

                bool exists = bc.DataContext.Customers.Any(c => c.Id == customer.Id);

                Assert.IsTrue(exists);
            }

        }

        [TestMethod]
        public void UpdateCustomer_ChangeValuesAreApplied()
        {
            using (var bc = new BudgetContext())
            {
                //Arrange
                var customer = new Customer()
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = "Anderson"
                };

                bc.CreateBudget(customer);

                const string newEmail = "new_ustomer@northwind.com",
                    newFirstName = "new_David",
                    newLastName = "new_Anderson";

                customer.Email = newEmail;
                customer.FirstName = newFirstName;
                customer.LastName = newLastName;

                //act
                bc.UpdateBudget(customer);

                bc.DataContext.Entry(customer).Reload();

                Assert.AreEqual(newEmail, customer.Email);
                Assert.AreEqual(newFirstName, customer.FirstName);
                Assert.AreEqual(newLastName, customer.LastName);
            }
        }

        [TestMethod]
        public void GetCustomerList_ReturnsExpectedListOfCustomerEntities()
        {
            using (var bc = new BudgetContext())
            {
                bc.CreateBudget(new Customer() { Email = "1@1.com", FirstName = "1", LastName = "a" });
                bc.CreateBudget(new Customer() { Email = "2@2.com", FirstName = "2", LastName = "b" });
                bc.CreateBudget(new Customer() { Email = "3@3.com", FirstName = "3", LastName = "c" });

                var customers = bc.GetBudgets();

                Assert.IsTrue(customers.ElementAt(0).Id == 1);
                Assert.IsTrue(customers.ElementAt(1).Id == 2);
                Assert.IsTrue(customers.ElementAt(2).Id == 3);
            }
        }

        [TestMethod]
        public void DeleteCustomer_RemoveCustomerFromDataStore()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer { Email = "1@1.com", FirstName = "1", LastName = "a" };
                bc.CreateBudget(customer);
                bc.DeleteBudget(customer);
                Assert.IsFalse(bc.DataContext.Customers.Any());
            }
        }
    }
}
