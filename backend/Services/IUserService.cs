using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<(bool, string)> AuthenticateAsync(string username, string password);
        Task<bool> AddUserAsync(UserModel newUser);
    }

}
