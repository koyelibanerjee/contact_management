using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactManagementSystem.Interfaces
{
   public interface IEVContactRepository
    {
        /// <summary>
        /// Fetches contact information based on contactId.
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns></returns>
        Task<EVDBContext.TblEVContact> GetContactById(int contactId);

        /// <summary>
        /// Delets contact's information based on contactId.
        /// </summary>
        /// <param name="contactId">User ID.</param>
        /// <returns>Success/failure boolean flag.</returns>
        Task<bool> DeleteContactById(int contactId);


        /// <summary>
        /// Fetches all contact information.
        /// </summary>
        /// <param name="">.</param>
        /// <returns></returns>
        Task<List<EVDBContext.TblEVContact>> GetContacts();

        /// <summary>
        /// Save/Update contact's information to the database.
        /// </summary>
        /// <param name="contact">contact's basic information.</param>
        /// <returns>Success/failure boolean flag.</returns>
        Task<bool> SaveContact(EVDBContext.TblEVContact contact);
    }
}
