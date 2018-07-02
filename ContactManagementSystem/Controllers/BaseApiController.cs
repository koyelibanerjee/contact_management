using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ContactManagementSystem.Controllers
{
    public class BaseApiController<T> : ApiController
    {
        public T Service { get; set; }
        

        protected BaseApiController(T service)
        {
            this.Service = service;
        }
       
    }
}