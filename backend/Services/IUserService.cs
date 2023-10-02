using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<(bool, string, string)> AuthenticateAsync(string username, string password);
        Task<bool> AddUserAsync(UserModel newUser);
        Task<bool> GetUserByEmailOrNICAsync(string email, string nic);

        Task<List<UserModel>> GetAllUsersAsync();
        Task<UserModel> GetUserByEmailAsync(string email);
    }

}
