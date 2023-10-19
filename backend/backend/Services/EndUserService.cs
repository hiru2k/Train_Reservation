/*
 * Filename: EndUserService.cs
 * Description: Contains the services which are re used in end user controller 
 * Author: Hiruni Mudannayake
 */

using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class EndUserService : IEndUserService
    {
        private readonly IMongoCollection<EndUserModel> _users;

        public EndUserService(IMongoDatabase database)
        {
            _users = database.GetCollection<EndUserModel>("EndUsers");
        }

        // Authenticates a user based on the provided traveler(enduser) model credentials.
        // Returns a boolean value and enduser obj 

        public async Task<(bool, EndUserModel)> AuthenticateAsync(EndUserModel Luser)
        {
            {
                var user = await _users.Find(u => u.Username == Luser.Username).FirstOrDefaultAsync();
                if (user == null || !VerifyPassword(Luser.Password, user.Password))
                {
                    return (false, null);
                }

                return (true, user);
            }
        }

        // Adds a new travel user to the database asynchronously.
        // Returns true if the user was added successfully,
        public async Task<bool> AddUserAsync(EndUserModel newUser)
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

        // Checks if a user with the provided email or NIC(primary key) already exists in the database.
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

        // Retrieves all travelers from the database asynchronously.
        // Returns a list of EndUserModel objects.
        public async Task<List<EndUserModel>> GetAllUsersAsync()
        {
            var users = await _users.Find(user => true).ToListAsync();
            return users;
        }


        // Retrieves a user by their NIC (National Identification Card) asynchronously.
        // Returns the EndUserModel object
        public async Task<EndUserModel> GetUserByNICAsync(string nic)
        {
            var user = await _users.Find(u => u.NIC == nic).FirstOrDefaultAsync();
            return user;
        }

        // Updates the user profile based on the NIC 
        // Returns true if the user profile was updated successfully
        public async Task<bool> UpdateUserProfileAsync(String uNIC, EndUserModel updatedUser)
        {
            var filter = Builders<EndUserModel>.Filter.Eq(u => u.NIC, uNIC);
            var update = Builders<EndUserModel>.Update
                .Set(u => u.Username, updatedUser.Username)
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Phone, updatedUser.Phone)
                .Set(u => u.Status, updatedUser.Status);



            var updateResult = await _users.UpdateOneAsync(filter, update);

            return updateResult.ModifiedCount > 0;
        }



        // Delete the traveler profile based on the NIC 
        // Returns true if the user profile was deleted successfully
        public async Task<bool> DeleteUserByNICAsync(string nic)
        {
            var user = await _users.Find(u => u.NIC == nic).FirstOrDefaultAsync();

            if (user == null)
            {
                return false;
            }

            await _users.DeleteOneAsync(u => u.NIC == nic);

            return true;
        }



        // Method to hash and salt a password
        public string HashPassword(string password)
        {
            // Generate a random salt
            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password with the salt
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        // Method to verify a password during login
        public bool VerifyPassword(string enteredPassword, string hashedPassword)
        {
            // Verify the entered password with the stored hashed password
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPassword);
        }

        public async Task<bool> VerifyUserPasswordAsync(string nic, string enteredPassword)
        {
            // Retrieve the data of user with the provided NIC from your data storage
            var user = await GetUserByNICAsync(nic);

            if (user == null)
            {

                return false;
            }

            // Verify the entered password with the stored hashed password
            bool isPasswordCorrect = VerifyPassword(enteredPassword, user.Password);

            return isPasswordCorrect;
        }




    }
}
