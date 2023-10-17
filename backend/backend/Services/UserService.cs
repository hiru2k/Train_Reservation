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

        public async Task<(bool, string, string, string)> AuthenticateAsync(UserModel Luser)
        {
            var user = await _users.Find(u => u.Username == Luser.Username && u.Password == Luser.Password).FirstOrDefaultAsync();
            if (user == null)
            {
                return (false, null, null, null);
            }

            return (true, user.Role, user.Email, user.NIC);
        }



        public async Task<bool> AddUserAsync(UserModel newUser)
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


        public async Task<List<UserModel>> GetAllUsersAsync()
        {
            var users = await _users.Find(user => true).ToListAsync();
            return users;
        }

        public async Task<UserModel> GetUserByNICAsync(string nic)
        {
            var user = await _users.Find(u => u.NIC == nic).FirstOrDefaultAsync();
            return user;
        }


        public async Task<bool> UpdateUserProfileAsync(String uNIC, UserModel updatedUser)
        {
            var filter = Builders<UserModel>.Filter.Eq(u => u.NIC, uNIC); // Assuming you have a unique identifier like UserId
            var update = Builders<UserModel>.Update
                .Set(u => u.Username, updatedUser.Username)
                .Set(u => u.Email, updatedUser.Email)
                .Set(u => u.Password, updatedUser.Password);
            // Add other properties you want to update
            // Optional: Update the last modified timestamp

            var updateResult = await _users.UpdateOneAsync(filter, update);

            return updateResult.ModifiedCount > 0;
        }

    }
}
