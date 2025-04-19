using Microsoft.EntityFrameworkCore;
using Npgsql;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
        Task<User> CreateUser(string username, string password);
        Task<User[]> GetUserList();
    }

public class UserRepository(SfDbContext sfDbContext) : IUserRepository
{
    public async Task<User> CreateUser(string username, string password) 
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

        var u = new User
        {
            Username = username,
            PasswordHash = passwordHash
        };

        await sfDbContext.Users.AddAsync(u);
        await sfDbContext.SaveChangesAsync();

        return u;
    }

    public async Task<User[]> GetUserList()
    {
        return await sfDbContext.Users.ToArrayAsync();
    }

    public async Task<User> GetByUsernameAsync(string username)
    {
        var user = await sfDbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null)
        {
            throw new ApplicationException("User does not exists");
        }

        return user;
    }
}