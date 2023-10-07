using backend.Models;

namespace backend.Services
{
    public interface IEndUserService
    {
        Task<(bool, EndUserModel)> AuthenticateAsync(EndUserModel Luser);
        Task<bool> AddUserAsync(EndUserModel newUser);
        Task<bool> GetUserByEmailOrNICAsync(string email, string nic);

        Task<List<EndUserModel>> GetAllUsersAsync();
        Task<EndUserModel> GetUserByNICAsync(string nic);

        Task<bool> UpdateUserProfileAsync(String uNIC, EndUserModel updatedUser);

    }
}
