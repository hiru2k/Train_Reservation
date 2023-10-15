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

        public async Task<(bool, string, string, string)> AuthenticateAsync(EndUserModel Luser)
        {
            var user = await _users.Find(u => u.Username == Luser.Username && u.Password == Luser.Password).FirstOrDefaultAsync();
            if (user == null)
            {
                return (false, null, null, null);
            }

            return (true, user.Role, user.Email, user.NIC);
        }



        public async Task<bool> AddUserAsync(EndUserModel newUser)
        {
            try
            {
                await _users.InsertOneAsync(newUser);
                return true;
            }
            catch (Exception ex)
            {
                // Handle the exception (log, return false, etc.)
                return false;
            }
        }


        public async Task<bool> GetUserByEmailOrNICAsync(string email, string nic)
        {
            var user = await _users.Find(u => u.Email == email || u.NIC == nic).FirstOrDefaultAsync();
            if (user == null)
            {
                return (true);
            }

            return (false);
        }


        public async Task<List<EndUserModel>> GetAllUsersAsync()
        {
            var users = await _users.Find(user => true).ToListAsync();
            return users;
        }

        public async Task<EndUserModel> GetUserByNICAsync(string nic)
        {
            var user = await _users.Find(u => u.NIC == nic).FirstOrDefaultAsync();
            return user;
        }


        public async Task<bool> UpdateUserProfileAsync(String uNIC, EndUserModel updatedUser)
        {
            var filter = Builders<EndUserModel>.Filter.Eq(u => u.NIC, uNIC); // Assuming you have a unique identifier like UserId
            var update = Builders<EndUserModel>.Update
                .Set(u => u.Username, updatedUser.Username)
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Phone, updatedUser.Phone)
                .Set(u => u.Status, updatedUser.Status);

            // Add other properties you want to update
            // Optional: Update the last modified timestamp

            var updateResult = await _users.UpdateOneAsync(filter, update);

            return updateResult.ModifiedCount > 0;
        }

    }
}
