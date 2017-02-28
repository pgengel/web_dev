using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;
using Budgety.Data.Contexts;
using Budgety.Data.Models;

namespace Budget.WebApi.Controllers
{
    public class BudgetsController : ApiController
    {
        private readonly IBudgetContext _budgetContext;

        public BudgetsController(IBudgetContext budgetContext)
        {
            _budgetContext = budgetContext;
        }

        [HttpGet]
        // GET: api/Budget
        public IEnumerable<Customer> GetCustomers()
        {
            try
            {
                var customers = _budgetContext.GetBudgets().ToList();

                if (customers == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return customers;

            }
            catch (Exception)
            {                
                throw new HttpResponseException(HttpStatusCode.InternalServerError); ;
            }
      
        }

        [HttpGet]
        // GET: api/Budget/5
        public Customer GetCustomer(int id)
        {
            try
            {
                var customer = _budgetContext.GetBudget(id);

                if (customer == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return customer;

            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
          
        }

        // POST: api/Budget
        [HttpPost]
        public Customer CreateCustomer([FromBody]Customer customer)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                _budgetContext.CreateBudget(customer);

                return customer;

            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }

        }

        // PUT: api/Budget/5
        [HttpPut]
        public void UpdateCustomer([FromBody]Customer customer)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                var customerInDb = _budgetContext.UpdateBudget(customer);

                if (!customerInDb)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }


            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }

        // DELETE: api/Budget/5
        [HttpDelete]
        public void Delete([FromBody]Customer customer)
        {
            try
            {
                var customerInDb = _budgetContext.DeleteBudget(customer);

                if (!customerInDb)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

            }
            catch (Exception)
            {

                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
            
        }
    }
}
