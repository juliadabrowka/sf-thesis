using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface IUserService
{
    Task CreateUser(string username, string password);
    Task<User[]> GetUserList();
}

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<User[]> GetUserList()
    {
        return await userRepository.GetUserList();
    }

    public async Task CreateUser(string username, string password)
    {
        await userRepository.CreateUser(username, password);
    }
}