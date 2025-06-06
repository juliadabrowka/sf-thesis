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
    Task<TripApplication[]> GetTripApplications();
    Task SubmitTripApplication(TripApplication tripApplication);
    Task SaveChangesAsync();
    Task AutosaveTripApplication(TripApplication tripApplication);
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
                .ThenInclude(sa => sa.SurveyQuestion)
            .Include(ta => ta.Trip)
                .ThenInclude(t => t.Survey)
            .ThenInclude(s => s.SurveyQuestions)
            .FirstOrDefaultAsync(s => s.Hash == hash);
        
        if (tripApplication == null)
        {
            throw new ApplicationException("No trip application found");
        }

        return tripApplication;
    }

    public async Task<TripApplication> CreateTripApplication(TripApplication tripApplicationEntity)
    {
        if (tripApplicationEntity.SurveyResponse != null && tripApplicationEntity.SurveyResponse.SurveyAnswers.Count != 0)
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
        tripApplicationEntity.Status = Status.Sent;

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

    public async Task<TripApplication[]> GetTripApplications()
    {
        return await sfDbContext.TripApplications
            .Include(ta => ta.SurveyResponse)
            .ThenInclude(sr => sr.SurveyAnswers)
            .ThenInclude(sa => sa.SurveyQuestion)
            .Include(ta => ta.Trip)
            .ThenInclude(t => t.Article)
            .Include(ta => ta.Trip)
            .ThenInclude(t => t.Survey)
            .ThenInclude(s => s.SurveyQuestions)
            .ToArrayAsync();
    }

    public async Task SubmitTripApplication(TripApplication tripApplication)
    {
        var application = await sfDbContext.TripApplications
            .Include(a => a.SurveyResponse)
            .ThenInclude(sr => sr.SurveyAnswers)
            .FirstOrDefaultAsync(a => a.Id == tripApplication.Id);

        if (application == null)
        {
            throw new ApplicationException("Trip application doesnt exists!");
        }

        if (application.SurveyResponse == null)
        {
            application.SurveyResponse = new SurveyResponse
            {
                RepliedOn = DateTime.UtcNow
            };
        }

        foreach (var dtoAnswer in tripApplication.SurveyResponse.SurveyAnswers)
        {
            var existingAnswer = application.SurveyResponse.SurveyAnswers
                .FirstOrDefault(a => a.SurveyQuestionId == dtoAnswer.SurveyQuestionId);

            if (existingAnswer != null)
            {
                existingAnswer.Answer = dtoAnswer.Answer;
            }
            else
            {
                application.SurveyResponse.SurveyAnswers.Add(new SurveyAnswer
                {
                    SurveyQuestionId = dtoAnswer.SurveyQuestionId,
                    Answer = dtoAnswer.Answer
                });
            }
        }

        application.Status = Status.Completed;

        await sfDbContext.SaveChangesAsync();
    }
    
    public async Task SaveChangesAsync()
    {
        await sfDbContext.SaveChangesAsync();
    }

    public async Task AutosaveTripApplication(TripApplication tripApplication)
    {
        sfDbContext.Update(tripApplication);
        await sfDbContext.SaveChangesAsync();
    }
}