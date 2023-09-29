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

        public bool IsValidUser(string username, string password)
        {
            var user = _users.Find(u => u.Username == username && u.Password == password).FirstOrDefault();
            return user != null;
        }
    }
}
