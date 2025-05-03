using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;
using sf.Utils;

namespace sf.Repositories;

public interface ITripApplicationRepository
{
    Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids);
    Task<TripApplication> GetTripApplicationByHash(string hash);
    Task<TripApplication> CreateTripApplication(TripApplication tripApplicationEntity);
    Task<TripApplication> GetTripApplicationsDetails(int tripApplicationId);
    Task<TripApplication> UpdateTripApplication(TripApplication newTripApplication);
}
public class TripApplicationRepository(SfDbContext sfDbContext) : ITripApplicationRepository
{
    public async Task<ICollection<TripApplication>> GetByIds(ICollection<int> ids)
    {
        return await sfDbContext.TripApplications
            .Where(x => ids.Contains(x.Id))
            .ToListAsync();
    }

    public async Task<TripApplication> GetTripApplicationByHash(string hash)
    {
        var tripApplication = await sfDbContext.TripApplications
            .Include(ta => ta.Trip)
                .ThenInclude(t => t.Article)
            .Include(ta => ta.SurveyResponse)
                .ThenInclude(sr => sr.SurveyAnswers)
            .FirstOrDefaultAsync(s => s.Hash == hash);
        
        if (tripApplication == null)
        {
            throw new ApplicationException("No trip application found");
        }

        return tripApplication;
    }

    public async Task<TripApplication> CreateTripApplication(TripApplication tripApplicationEntity)
    {
        if (tripApplicationEntity.SurveyResponse != null)
        {
            var response = sfDbContext.SurveyResponses
                .First(sr => sr.Id == tripApplicationEntity.SurveyResponseId);
            response.TripApplication = tripApplicationEntity;
            response.TripApplicationId = tripApplicationEntity.Id;

            tripApplicationEntity.SurveyResponse = response;
        }

        var existingTrip = sfDbContext.Trips.First(t => t.Id == tripApplicationEntity.TripId);
        tripApplicationEntity.Trip = existingTrip;
        // create unique hash per trip application
        tripApplicationEntity.Hash = TripApplicationHashGenerator.GenerateHash(tripApplicationEntity);

        await sfDbContext.TripApplications.AddAsync(tripApplicationEntity);
        await sfDbContext.SaveChangesAsync();

        return tripApplicationEntity;
    }

    public async Task<TripApplication> GetTripApplicationsDetails(int tripApplicationId)
    {
        var tripApplication = await sfDbContext.TripApplications
            .Include(ta => ta.SurveyResponse)
            .ThenInclude(sr => sr.SurveyAnswers)
            .Include(ta => ta.Trip)
            .ThenInclude(t => t.Survey)
            .FirstOrDefaultAsync(ta => ta.Id == tripApplicationId);

        if (tripApplication == null)
        {
            throw new ApplicationException("Trip application not found");
        }

        return tripApplication;
    }

    public async Task<TripApplication> UpdateTripApplication(TripApplication newTripApplication)
    {
        sfDbContext.TripApplications.Update(newTripApplication);
        await sfDbContext.SaveChangesAsync();
        return newTripApplication;
    }
}