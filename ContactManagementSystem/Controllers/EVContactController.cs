using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using ContactManagementSystem.EVDBContext;
using ContactManagementSystem.Interfaces;
using Newtonsoft.Json.Linq;

namespace ContactManagementSystem.Controllers
{
    /// <summary>
    /// Contains endpoints for all the services related to contact information.
    /// </summary>

    
    public class EVContactController : BaseApiController<IEVContactRepository>
    {
        /// <summary>
        /// Field of type IQuoteRepository.
        /// </summary>
        private IEVContactRepository evcontactRepo;

        /// <summary>
        /// Constructor for EVContactController controller which performs dependency injection for all the required objects.
        /// </summary>
        /// <param name="evcontactRepo">IEVContactRepository variable.</param>
        public EVContactController(IEVContactRepository evcontactRepo) : base(evcontactRepo)
        {
            this.evcontactRepo = evcontactRepo;

        }


        /// <summary>
        /// Called from Add Contact. Saves Contact Information to the Database
        /// </summary>
        /// <param name="contact"></param>
        /// <returns>Success / Failure Response</returns>
        [HttpPost]
        [Route("api/SaveContact")]
        public async Task<bool> SaveContact([FromBody] TblEVContact contact)
        {
            bool result = false;

            result = await evcontactRepo.SaveContact(contact);

            return result;
        }


        /// <summary>
        /// Deletes a Contact based on contact ID.
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("api/DeleteContactById")]
        public async Task<bool> DeleteQuoteById(int contactId)
        {
            bool itemDeleted = await evcontactRepo.DeleteContactById(contactId);
            return itemDeleted;
        }


        /// <summary>
        /// Gets the list of contacts.
        /// </summary>
        /// <param name=""</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/GetContacts")]
        public async Task<List<TblEVContact>> GetContacts()
        {
            List<TblEVContact> result = new List<TblEVContact>();

            result = await evcontactRepo.GetContacts();
            return result;


        }

        /// <summary>
        /// Gets the list of contact by contactId.
        /// </summary>
        /// <param name="contactId"</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/GetContactById")]
        public async Task<JObject> GetContactById(int contactId)
        {
            string result = string.Empty;

            JObject resp = new JObject();
            resp = (JObject)JToken.FromObject(await evcontactRepo.GetContactById(contactId));


            return resp;


        }

        
            

    }
}
