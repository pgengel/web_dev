﻿using EnterpriseAngular2.WebApi.Controllers;
using Microsoft.Owin;
using Microsoft.Practices.Unity;
using Owin;

[assembly: OwinStartup(typeof(EnterpriseAngular2.WebApi.Startup))]

namespace EnterpriseAngular2.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            ConfigureAuth(app);
        }
    }
}
