namespace backend.Services
{
    public interface IUserService
    {
        bool IsValidUser(string username, string password);
    }

}
