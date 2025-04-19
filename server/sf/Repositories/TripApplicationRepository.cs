using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripApplicationRepository
{
    Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids);
}
public class TripApplicationRepository(SfDbContext sfDbContext) : ITripApplicationRepository
{
    public async Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids)
    {
        return await sfDbContext.TripApplications
            .Where(x => ids.Contains(x.Id))
            .ToListAsync();
    }
}