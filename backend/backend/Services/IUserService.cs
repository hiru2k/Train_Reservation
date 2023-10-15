using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<(bool, string, string, string)> AuthenticateAsync(UserModel Luser);
        Task<bool> AddUserAsync(UserModel newUser);
        Task<bool> GetUserByEmailOrNICAsync(string email, string nic);

        Task<List<UserModel>> GetAllUsersAsync();
        Task<UserModel> GetUserByNICAsync(string nic);

        Task<bool> UpdateUserProfileAsync(String uNIC, UserModel updatedUser);

    }
}
