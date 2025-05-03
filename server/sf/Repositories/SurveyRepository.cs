using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;
using sf.Utils;

namespace sf.Repositories;

public interface ISurveyRepository
{
    Task<Survey> CreateSurvey(Survey survey);
    Task<Survey[]> GetSurveys();
    Task<Survey> GetSurveyDetails(int surveyId);
    Task<Survey> UpdateSurvey(Survey survey);
    Task DeleteSurveys(int[] surveyIds);
    Task<TripApplication> GetSurveyByHash(string hash);
}
public class SurveyRepository(SfDbContext sfDbContext) : ISurveyRepository
{
    public async Task<Survey> CreateSurvey(Survey survey)
    {
        if (survey.TripIds.Any())
        {
            var trips = await sfDbContext.Trips
                .Where(t => survey.TripIds.Contains(t.Id))
                .ToListAsync();

            foreach (var trip in trips)
            {
                trip.Survey = survey;
            }

            survey.Trips = trips;
        }

        await sfDbContext.Surveys.AddAsync(survey);
        await sfDbContext.SaveChangesAsync();

        return survey;
    }

    public async Task<Survey[]> GetSurveys()
    {
        return await sfDbContext.Surveys
            .Include(s => s.Trips)
                .ThenInclude(t => t.Article)
            .Include(t => t.SurveyQuestions)
                .ThenInclude(sq => sq.Surveys)
            .ToArrayAsync();
    }

    public async Task<Survey> GetSurveyDetails(int surveyId)
    {
        var s = await sfDbContext.Surveys
            .Include(s => s.Trips)
                .ThenInclude(t => t.Article)
            .Include(s => s.SurveyQuestions)
                .ThenInclude(sq => sq.Surveys)
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

    public async Task<TripApplication> GetSurveyByHash(string hash)
    {
        var tripApplication = await sfDbContext.TripApplications
            .Include(ta => ta.Trip)
                .ThenInclude(t => t.Article)
            .Include(ta => ta.SurveyResponse)
                .ThenInclude(sr => sr.SurveyAnswers)
            .FirstOrDefaultAsync(s => s.Hash == hash);
        
        if (tripApplication == null)
        {
            throw new ApplicationException("No survey to delete found");
        }

        return tripApplication;
    }
}