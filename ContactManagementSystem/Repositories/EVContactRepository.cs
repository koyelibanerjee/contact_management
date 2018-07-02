using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ContactManagementSystem.EVDBContext;
using ContactManagementSystem.Interfaces;

namespace ContactManagementSystem.Repositories
{
    public class EVContactRepository : IEVContactRepository
    {
        protected readonly EVContactDBEntities EVContactDB = new EVContactDBEntities();

        /// <summary>
        /// Delets contact's information based on contactId.
        /// </summary>
        /// <param name="contactId">User ID.</param>
        /// <returns>Success/failure boolean flag.</returns>
        async Task<bool> IEVContactRepository.DeleteContactById(int contactId)
        {
            bool result = false;
            var itemToRemove = EVContactDB.TblEVContacts.SingleOrDefault(c => c.Id.Equals(contactId) && c.Status.Equals("Active"));
            if (itemToRemove != null)
            {
                itemToRemove.Status = "Inactive";
                EVContactDB.Entry(itemToRemove).State = EntityState.Modified;
                await EVContactDB.SaveChangesAsync();
                result = true;
            }
            return result;
        }

        /// <summary>
        /// Fetches contact information based on contactId.
        /// </summary>
        /// <param name="contactId"></param>
        /// <returns></returns>
        async Task<EVDBContext.TblEVContact> IEVContactRepository.GetContactById(int contactId)
        {
            var entities = await Task.Run(() => EVContactDB.TblEVContacts.Where(c => c.Id == contactId).FirstOrDefault());
            return entities;
        }

        /// <summary>
        /// Fetches all contact information.
        /// </summary>
        /// <param name="">.</param>
        /// <returns></returns>
        async Task<List<EVDBContext.TblEVContact>> IEVContactRepository.GetContacts()
        {

            var entities = await Task.Run(() => EVContactDB.TblEVContacts.Where(c => c.Status == "Active").ToList());
            return entities;
           
            
        }

        /// <summary>
        /// Save/Update contact's information to the database.
        /// </summary>
        /// <param name="contact">contact's basic information.</param>
        /// <returns>Success/failure boolean flag.</returns>
        async Task<bool> IEVContactRepository.SaveContact(TblEVContact contact)
        {
            bool usersaved = false;
            var existingUser = EVContactDB.TblEVContacts.AsNoTracking().Where(c => c.Id == contact.Id).SingleOrDefault();
            var duplicateUser = EVContactDB.TblEVContacts.AsNoTracking().Where(c => c.Email == contact.Email && c.Status == "Active").SingleOrDefault();
            // var existingUser = EVContactDB.TblEVContacts.Find(contact.Id);

            try
            {
               
                if (existingUser != null)
                {
                    
                    EVContactDB.Entry(contact).State = EntityState.Modified;
                    await EVContactDB.SaveChangesAsync();
                    usersaved = true;
                }
                else
                {  if(duplicateUser == null)
                    {
                        contact.Status = "Active";
                        EVContactDB.TblEVContacts.Add(contact);
                        await EVContactDB.SaveChangesAsync();
                        usersaved = true;
                    }
                    else
                    {
                        usersaved = false;
                    }
                }

                
            }
            catch (Exception ex)
            {
                usersaved = false;
            }

            return usersaved;
        }
    }
}