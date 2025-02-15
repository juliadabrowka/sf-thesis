using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface IUserService
{
    Task CreateUser(string username, string password);
    Task<User[]> GetUserList();
}

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User[]> GetUserList()
    {
        return await _userRepository.GetUserList();
    }

    public async Task CreateUser(string username, string password)
    {
        await _userRepository.CreateUser(username, password);
    }
}