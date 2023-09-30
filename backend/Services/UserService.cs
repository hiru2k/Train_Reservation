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

        public async Task<(bool, string)> AuthenticateAsync(string username, string password)
        {
            var user = await _users.Find(u => u.Username == username && u.Password == password).FirstOrDefaultAsync();
            if (user == null)
            {
                return (false, null);
            }

            return (true, user.Role);
        }
    }
}
