using System;
using System.Collections.Generic;
using System.Linq;
using Budget.WebApi.Controllers;
using Budgety.Data.Contexts;
using Microsoft.Owin;
using Microsoft.Practices.Unity;
using Owin;

[assembly: OwinStartup(typeof(Budget.WebApi.Startup))]

namespace Budget.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //var container = new UnityContainer();

            //container.RegisterType<IBudgetContext, BudgetContext>();
            //container.RegisterType<BudgetsController>();

            //container.Resolve<BudgetsController>();
            ConfigureAuth(app);
        }
    }
}
