using EnterpriseAngular2.Data.Contexts;
using EnterpriseAngular2.Data.Models;
using EnterpriseAngular2.WebApi.Controllers;
using NSubstitute;
using NUnit.Framework;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace EnterpriseAngular2.WebApi.Tests.UnitTests
{
    [TestFixture]
    public class ValuesControllerTests
    {
        [Test]
        public void GetCustomer_GivenCustomers_ShouldReturnCustomers()
        {
            //arrange
            var testCustomers = GetTestCustomer();
            var fakeController = Substitute.For<IBusinessContext>();
            fakeController.GetCustomerList().Returns(testCustomers);

            var valueController = new ValuesController(fakeController);

            //act
            var actualResult = valueController.Get();

            //assert
            Assert.AreEqual(testCustomers, actualResult);

        }

        [Test]
        public void PostCustomer_GivenEmptyCustomers_ShouldReturnFalse()
        {
            //arrange
            var testCustomers = "";
            var fakeController = Substitute.For<IBusinessContext>();
            var valueController = new ValuesController(fakeController);

            //act
            var actualResult = valueController.Post(testCustomers);

            //assert
            Assert.AreEqual(false, actualResult);
        }

        [Test]
        public void PostCustomer_GivenCustomers_ShouldReturnTrue()
        {
            //arrange
            var testCustomers = "{'Email':'1@1.com','FirstName':'1','LastName':'a'}";
            var fakeController = Substitute.For<IBusinessContext>();
            var valueController = new ValuesController(fakeController);


            //act
            var actualResult = valueController.Post(testCustomers);

            //assert
            Assert.AreEqual(true, actualResult);
        }

        [Test]
        public void PutCustomer_GivenEmptyCustomers_ShouldReturnFalse()
        {
            //arrange
            var testCustomers = "";
            var fakeController = Substitute.For<IBusinessContext>();
            var valueController = new ValuesController(fakeController);

            //act
            var actualResult = valueController.Put(testCustomers);

            //assert
            Assert.AreEqual(false, actualResult);
        }

        [Test]
        public void PutCustomer_GivenCustomers_ShouldReturnTrue()
        {
            //arrange
            var testCustomers = "{'Email':'1@1.com','FirstName':'1','LastName':'a'}";
            var fakeController = Substitute.For<IBusinessContext>();
            var valueController = new ValuesController(fakeController);


            //act
            var actualResult = valueController.Put(testCustomers);

            //assert
            Assert.AreEqual(true, actualResult);
        }

        private List<Customer> GetTestCustomer()
        {
            var testCustomer = new List<Customer>();
            testCustomer.Add(new Customer()
            {
                Id = 1,
                Email = "p@g.e",
                FirstName = "p",
                LastName = "e"
            });

            testCustomer.Add(new Customer()
            {
                Id = 2,
                Email = "a@b.c",
                FirstName = "a",
                LastName = "b"
            });

            return testCustomer;
        }
    }
}
