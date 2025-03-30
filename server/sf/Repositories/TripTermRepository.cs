using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripTermRepository
{
    Task<TripTerm[]> GetTripTerms();
    Task<TripTerm> GetTripTermDetails(int tripTermId);
    Task<TripTerm> CreateTripTerm(TripTerm trip);
    Task<TripTerm> UpdateTripTerm(TripTerm trip);
    Task DeleteTripTerms(int[] tripTermIds);
}
public class TripTermRepository : ITripTermRepository
{
    private readonly SfDbContext _sfDbContext;

    public TripTermRepository(SfDbContext sfDbContext)
    {
        _sfDbContext = sfDbContext;
    }

    public Task<TripTerm[]> GetTripTerms()
    {
        throw new NotImplementedException();
    }

    public Task<TripTerm> GetTripTermDetails(int tripTermId)
    {
        throw new NotImplementedException();
    }

    public Task<TripTerm> CreateTripTerm(TripTerm trip)
    {
        throw new NotImplementedException();
    }

    public Task<TripTerm> UpdateTripTerm(TripTerm trip)
    {
        throw new NotImplementedException();
    }

    public Task DeleteTripTerms(int[] tripTermIds)
    {
        throw new NotImplementedException();
    }
}