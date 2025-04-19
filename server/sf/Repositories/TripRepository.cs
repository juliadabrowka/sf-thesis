using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripRepository
{
    Task<Trip[]> GetTrips();
    Task<Trip> GetTripDetails(int tripId);
    Task<Trip> CreateTrip(Trip trip);
    Task<Trip> UpdateTrip(Trip trip);
    Task DeleteTrips(int[] tripIds);
}

public class TripRepository(SfDbContext sfDbContext) : ITripRepository
{
    public async Task<Trip[]> GetTrips()
    {
        return await sfDbContext.Trips
            .Include(t => t.TripApplications)
            .Include(t => t.TripTerms)
            .Include(t => t.Survey)
            .ToArrayAsync();
    }

    public async Task<Trip> GetTripDetails(int tripId)
    {
        var t = await sfDbContext.Trips
            .FirstOrDefaultAsync(t => t.Id == tripId);
        
        if (t == null)
        {
            throw new ApplicationException("Given id does not correspond to any Trip");
        }

        return t;
    }

    public async Task<Trip> CreateTrip(Trip trip)
    {
        sfDbContext.Trips.Add(trip);
    
        await sfDbContext.SaveChangesAsync();
        return trip;
    }

    public async Task<Trip> UpdateTrip(Trip trip)
    {
        var existingTrip = await sfDbContext.Trips.FindAsync(trip.Id);
        if (existingTrip == null)
        {
            throw new ApplicationException($"Trip with ID {trip.Id} not found.");
        }

        sfDbContext.Entry(existingTrip).CurrentValues.SetValues(trip);
        await sfDbContext.SaveChangesAsync();
        return existingTrip;
    }
    
    public async Task DeleteTrips(int[] tripIds)
    {
        var trips = await sfDbContext.Trips
            .Where(t => tripIds.Contains(t.Id))
            .ToListAsync();
        
        if (!trips.Any())
        {
            throw new AggregateException("No trips found to delete");
        }
        
        sfDbContext.Trips.RemoveRange(trips);
        await sfDbContext.SaveChangesAsync();
    }
}