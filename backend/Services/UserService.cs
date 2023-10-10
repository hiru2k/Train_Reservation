/*
 * Filename: UserService.cs
 * Description: Contains the services which are re used in (travel agent + back officer) apis
 * Author: Hiruni Mudannayake
 */

using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<UserModel> _users;

        public UserService(IMongoDatabase database)
        {
            _users = database.GetCollection<UserModel>("Users");
        }
        // Authenticates a user(travel agent + back officer) based on the provided username,password
        public async Task<(bool, string, string, string)> AuthenticateAsync(UserModel Luser)
        {
            var user = await _users.Find(u => u.Username == Luser.Username && u.Password == Luser.Password).FirstOrDefaultAsync();
            if (user == null)
            {
                return (false, null, null, null);
            }

            return (true, user.Role, user.Email, user.NIC);
        }


        // Adds a new user(travel agent + back officer) to the database asynchronously.
        // Returns true if the user was added successfully.
        public async Task<bool> AddUserAsync(UserModel newUser)
        {
            try
            {
                await _users.InsertOneAsync(newUser);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        // Checks if a user(travel agent + back officer) with the provided email or NIC already exists in the database.
        // Returns true if the user does not exist
        public async Task<bool> GetUserByEmailOrNICAsync(string email, string nic)
        {
            var user = await _users.Find(u => u.Email == email || u.NIC == nic).FirstOrDefaultAsync();
            if (user == null)
            {
                return (true);
            }

            return (false);
        }




        // Retrieves a user(travel agent + back officer) by their NIC (National Identification Card) asynchronously.
        // Returns the UserModel object 
        public async Task<UserModel> GetUserByNICAsync(string nic)
        {
            var user = await _users.Find(u => u.NIC == nic).FirstOrDefaultAsync();
            return user;
        }

        // Updates the user(travel agent + back officer) profile based on the provided NIC asynchronously.
        // Returns true if the user profile was updated successfully, false otherwise.
        public async Task<bool> UpdateUserProfileAsync(String uNIC, UserModel updatedUser)
        {
            var filter = Builders<UserModel>.Filter.Eq(u => u.NIC, uNIC);
            var update = Builders<UserModel>.Update
                .Set(u => u.Username, updatedUser.Username)
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Password, updatedUser.Password);


            var updateResult = await _users.UpdateOneAsync(filter, update);

            return updateResult.ModifiedCount > 0;
        }

    }
}
