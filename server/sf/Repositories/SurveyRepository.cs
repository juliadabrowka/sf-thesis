using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ISurveyRepository
{
    Task<Survey> CreateSurvey(Survey survey);
    Task<Survey[]> GetSurveys();
    Task<Survey> GetSurveyDetails(int surveyId);
    Task<Survey> UpdateSurvey(Survey survey);
    Task DeleteSurveys(int[] surveyIds);
}
public class SurveyRepository(SfDbContext sfDbContext) : ISurveyRepository
{
    public async Task<Survey> CreateSurvey(Survey survey)
    {
        if (survey.TripId.HasValue)
        {
            var existingTrip = await sfDbContext.Trips.FindAsync(survey.TripId.Value);
            if (existingTrip != null)
            {
                survey.Trip = existingTrip;
            }
        }
        await sfDbContext.Surveys.AddAsync(survey);
        await sfDbContext.SaveChangesAsync();

        return survey;
    }

    public async Task<Survey[]> GetSurveys()
    {
        return await sfDbContext.Surveys
            .Include(s => s.Trip)
            .Include(t => t.SurveyQuestions)
            .ToArrayAsync();
    }

    public async Task<Survey> GetSurveyDetails(int surveyId)
    {
        var s = await sfDbContext.Surveys
            .Include(s => s.Trip)
            .Include(s => s.SurveyQuestions)
            .FirstOrDefaultAsync(s => s.Id == surveyId);

        if (s == null)
        {
            throw new ApplicationException("Survey not found");
        }

        return s;
    }

    public async Task<Survey> UpdateSurvey(Survey survey)
    {
        sfDbContext.Surveys.Update(survey);
        await sfDbContext.SaveChangesAsync();
        return survey;
    }

    public async Task DeleteSurveys(int[] surveyIds)
    {
        var surveys = await sfDbContext.Surveys
            .Where(s => surveyIds.Contains(s.Id))
            .ToListAsync();

        if (!surveys.Any())
        {
            throw new ApplicationException("No survey to delete found");
        }
        sfDbContext.Surveys.RemoveRange(surveys);
        await sfDbContext.SaveChangesAsync();
    }
}