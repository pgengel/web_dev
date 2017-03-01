using EnterpriseAngular2.Data.Contexts;
using EnterpriseAngular2.Data.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Http;
using System.Web.WebPages;


namespace EnterpriseAngular2.WebApi.Controllers
{
    //[Authorize]
    public class ValuesController : ApiController
    {
        private readonly IBusinessContext _context;
        private Customer _selectedCustomer;

        public ICollection<Customer> Customers { get; private set; }

        public ValuesController(IBusinessContext context)
        {
            this._context = context;
            Customers = new ObservableCollection<Customer>();
        }


        // GET api/values/get
        public IEnumerable<Customer> Get()
        {
            try
            {
                return _context.GetCustomerList();

            }
            catch (Exception)
            {

                throw;
            }

        }

        // POST api/values/post
        public bool Post([FromBody]string customer)
        {
            try
            {
                if (!customer.IsEmpty())
                {

                    Customer deserializedCustomer = JsonConvert.DeserializeObject<Customer>(customer);
                    _context.CreateCustomer(deserializedCustomer);
                    return true;

                }

                return false;

            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        public bool Put([FromBody]string customer)
        {
            try
            {
                if (!customer.IsEmpty())
                {

                    Customer deserializedCustomer = JsonConvert.DeserializeObject<Customer>(customer);
                    _context.UpdateCustomer(deserializedCustomer);
                    return true;

                }

                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE api/values/5
        public bool Delete(string customer)
        {
            try
            {

                if (!customer.IsEmpty())
                {

                    Customer deserializedCustomer = JsonConvert.DeserializeObject<Customer>(customer);
                    _context.DeleteCustomer(deserializedCustomer);
                    Customers.Remove(deserializedCustomer);
                    deserializedCustomer = null;
                    return true;

                }

                return false;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
