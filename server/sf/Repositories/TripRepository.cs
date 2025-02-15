using System.Data.SqlClient;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ITripRepository
{
    Task<Trip[]> GetTrips();
    Task<Trip> GetTripDetails(int tripId);
    Task<Trip> CreateTrip(Trip trip);
    Task<Trip> UpdateTrip(Trip trip);
}

public class TripRepository : ITripRepository
{
    private readonly SfDbContext _sfDbContext;

    public TripRepository(SfDbContext sfDbContext)
    {
        _sfDbContext = sfDbContext;
    }

    public async Task<Trip[]> GetTrips()
    {
        return await _sfDbContext.Trips
            .Include(t => t.Articles)
            .Include(t => t.TripApplications)
            .ToArrayAsync();
    }

    public async Task<Trip> GetTripDetails(int tripId)
    {
        var t = await _sfDbContext.Trips
            .Include(t => t.Articles)
            .Include(t => t.TripApplications)
            .FirstOrDefaultAsync(t => t.Id == tripId);
        
        if (t == null)
        {
            throw new ApplicationException("Given id does not correspond to any Trip");
        }

        return t;
    }

    public async Task<Trip> CreateTrip(Trip trip)
    {
        await _sfDbContext.Trips.AddAsync(trip);
        await _sfDbContext.SaveChangesAsync();

        return trip;
    }

    public async Task<Trip> UpdateTrip(Trip trip)
    {
        _sfDbContext.Trips.Update(trip);
        await _sfDbContext.SaveChangesAsync();
        return trip;
    }
}