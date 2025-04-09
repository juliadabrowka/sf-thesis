using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripApplicationRepository
{
    Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids);
}
public class TripApplicationRepository : ITripApplicationRepository
{    private readonly SfDbContext _sfDbContext;

    public TripApplicationRepository(SfDbContext sfDbContext)
    {
        _sfDbContext = sfDbContext;
    }
    
    public async Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids)
    {
        return await _sfDbContext.TripApplications
            .Where(x => ids.Contains(x.Id))
            .ToListAsync();
    }
}