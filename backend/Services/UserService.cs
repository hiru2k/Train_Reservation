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

        public async Task<(bool, string, string)> AuthenticateAsync(string username, string password)
        {
            var user = await _users.Find(u => u.Username == username && u.Password == password).FirstOrDefaultAsync();
            if (user == null)
            {
                return (false, null, null);
            }

            return (true, user.Role, user.Email);
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

        public async Task<UserModel> GetUserByEmailAsync(string email)
        {
            var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
            return user;
        }

    }
}
