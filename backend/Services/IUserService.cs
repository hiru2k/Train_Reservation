namespace backend.Services
{
    public interface IUserService
    {
        Task<(bool, string)> AuthenticateAsync(string username, string password);
    }

}
