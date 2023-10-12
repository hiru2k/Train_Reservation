using backend.Models;

namespace backend.Services
{
    public interface IEndUserService
    {
        Task<(bool, string, string, string, string)> AuthenticateAsync(EndUserModel Luser);
        Task<bool> AddUserAsync(EndUserModel newUser);
        Task<bool> GetUserByEmailOrNICAsync(string email, string nic);

        Task<List<EndUserModel>> GetAllUsersAsync();
        Task<EndUserModel> GetUserByNICAsync(string nic);

        Task<bool> UpdateUserProfileAsync(String uNIC, EndUserModel updatedUser);

    }
}
