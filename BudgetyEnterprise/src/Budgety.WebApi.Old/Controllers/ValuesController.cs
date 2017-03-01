using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Budgety.Data.Contexts;
using Budgety.Data.Models;

namespace Budgety.WebApi.Controllers
{
    //[Authorize]
    public class ValuesController : ApiController
    {

        private readonly IBudgetContext _budgetContext;

        public ValuesController(IBudgetContext budgetContext)
        {
            _budgetContext = budgetContext;
        }

      
        // GET: api/Budget
        public IEnumerable<Customer> GetCustomers()
        {
            try
            {
                using (var bc = new BudgetContext())
                {

                    return bc.GetBudgets();

                }

                //var customers = _budgetContext.GetBudgets();

                //if (customers == null)
                //{
                //    throw new HttpResponseException(HttpStatusCode.NotFound);
                //}

                return null;

            }
            catch (Exception e)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError); ;
            }

        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
