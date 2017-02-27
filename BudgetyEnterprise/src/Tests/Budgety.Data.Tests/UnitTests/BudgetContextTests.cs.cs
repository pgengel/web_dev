using System;
using System.Linq;
using Budgety.Data.Contexts;
using Budgety.Data.Models;
using Budgety.Data.Tests.FunctionalTests;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Budgety.Data.Tests
{
    [TestClass]
    public class BusinessContextTests : DatabaseScenarioTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenEmailIsNull()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = null,
                    FirstName = "David",
                    LastName = "Anderson"
                };
                bc.CreateBudget(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenEmailIsEmpty()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = "",
                    FirstName = "David",
                    LastName = "Anderson"
                };
                bc.CreateBudget(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenNameIsNull()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = null,
                    LastName = "Anderson"
                };
                bc.CreateBudget(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenNameIsEmpty()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "",
                    LastName = "Anderson"
                };
                bc.CreateBudget(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenLastNameIsNull()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = null
                };
                bc.CreateBudget(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenLastNameIsEmpty()
        {
            using (var bc = new BudgetContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = ""
                };
                bc.CreateBudget(customer);
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
        public void GetCustomerList_ReturnsExpectedCustomer()
        {
            using (var bc = new BudgetContext())
            {
                bc.CreateBudget(new Customer() { Email = "1@1.com", FirstName = "1", LastName = "a" });
                bc.CreateBudget(new Customer() { Email = "2@2.com", FirstName = "2", LastName = "b" });
                bc.CreateBudget(new Customer() { Email = "3@3.com", FirstName = "3", LastName = "c" });

                var customers = bc.GetBudget();

                Assert.IsTrue(customers.ElementAt(0).Id == 1);
                Assert.IsTrue(customers.ElementAt(1).Id == 2);
                Assert.IsTrue(customers.ElementAt(2).Id == 3);
            }
        }
    }
}
