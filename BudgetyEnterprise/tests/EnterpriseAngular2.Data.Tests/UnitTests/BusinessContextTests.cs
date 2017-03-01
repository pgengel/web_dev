using EnterpriseAngular2.Data.Contexts;
using EnterpriseAngular2.Data.Models;
using EnterpriseAngular2.Data.Tests.FunctionalTests;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace EnterpriseMVVM.Data.Tests.UnitTests
{
    [TestClass]
    public class BusinessContextTests : DatabaseScenarioTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenEmailIsNull()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = null,
                    FirstName = "David",
                    LastName = "Anderson"
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenEmailIsEmpty()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = "",
                    FirstName = "David",
                    LastName = "Anderson"
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenNameIsNull()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = null,
                    LastName = "Anderson"
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenNameIsEmpty()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "",
                    LastName = "Anderson"
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenLastNameIsNull()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = null
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void AddNewCustomer_ThrowsException_WhenLastNameIsEmpty()
        {
            using (var bc = new BusinessContext())
            {
                var customer = new Customer
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = ""
                };
                bc.CreateCustomer(customer);
            }
        }

        [TestMethod]
        public void UpdateCustomer_ChangeValuesAreApplied()
        {
            using (var bc = new BusinessContext())
            {
                //Arrange
                var customer = new Customer()
                {
                    Email = "customer@northwind.com",
                    FirstName = "David",
                    LastName = "Anderson"
                };

                bc.CreateCustomer(customer);

                const string newEmail = "new_ustomer@northwind.com",
                    newFirstName = "new_David",
                    newLastName = "new_Anderson";

                customer.Email = newEmail;
                customer.FirstName = newFirstName;
                customer.LastName = newLastName;

                //act
                bc.UpdateCustomer(customer);

                bc.DataContext.Entry(customer).Reload();

                Assert.AreEqual(newEmail, customer.Email);
                Assert.AreEqual(newFirstName, customer.FirstName);
                Assert.AreEqual(newLastName, customer.LastName);
            }
        }

        [TestMethod]
        public void GetCustomerList_ReturnsExpectedCustomer()
        {
            using (var bc = new BusinessContext())
            {
                bc.CreateCustomer(new Customer() { Email = "1@1.com", FirstName = "1", LastName = "a" });
                bc.CreateCustomer(new Customer() { Email = "2@2.com", FirstName = "2", LastName = "b" });
                bc.CreateCustomer(new Customer() { Email = "3@3.com", FirstName = "3", LastName = "c" });

                var customers = bc.GetCustomerList();

                Assert.IsTrue(customers.ElementAt(0).Id == 1);
                Assert.IsTrue(customers.ElementAt(1).Id == 2);
                Assert.IsTrue(customers.ElementAt(2).Id == 3);
            }
        }
    }
}
