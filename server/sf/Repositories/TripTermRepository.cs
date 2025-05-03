using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripTermRepository
{
    Task<TripTerm[]> GetTripTerms();
        Task<TripTerm> GetTripTermDetails(int tripTermId);
        Task<TripTerm> CreateTripTerm(TripTerm trip);
        Task<TripTerm> UpdateTripTerm(TripTerm tripTerm);
        Task DeleteTripTerms(int[] tripIds);
}

public class TripTermRepository(SfDbContext sfDbContext) : ITripTermRepository
{
    public Task<TripTerm[]> GetTripTerms()
    {
        throw new NotImplementedException();
    }

    public async Task<TripTerm> GetTripTermDetails(int tripTermId)
    {
        var tripTerm = await sfDbContext.TripTerms.FirstOrDefaultAsync(
            tt => tt.Id == tripTermId);

        return tripTerm;
    }

    public Task<TripTerm> CreateTripTerm(TripTerm trip)
    {
        throw new NotImplementedException();
    }

    public async Task<TripTerm> UpdateTripTerm(TripTerm tripTerm)
    {
        var existingTripTerm = await sfDbContext.TripTerms.FindAsync(tripTerm.Id);
        if (existingTripTerm == null)
        {
            throw new ApplicationException($"TripTerm with ID {tripTerm.Id} not found.");
        }

        sfDbContext.Entry(existingTripTerm).CurrentValues.SetValues(tripTerm);
        await sfDbContext.SaveChangesAsync();
        return existingTripTerm;
    }

    public Task DeleteTripTerms(int[] tripIds)
    {
        throw new NotImplementedException();
    }
}