using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ISurveyAnswerRepository
{
    Task<SurveyAnswer> CreateSurveyAnswer(SurveyAnswer surveyDto);
    Task<SurveyAnswer> UpdateSurveyAnswer(SurveyAnswer surveyDto);
    Task<SurveyAnswer[]> GetSurveyAnswers();
    Task<SurveyAnswer> GetSurveyAnswerDetails(int surveyId);
    Task DeleteSurveyAnswers(int[] surveyIds);
}

public class SurveyAnswerRepository(SfDbContext sfDbContext) : ISurveyAnswerRepository
{
    public Task<SurveyAnswer> CreateSurveyAnswer(SurveyAnswer surveyDto)
    {
        throw new NotImplementedException();
    }

    public Task<SurveyAnswer> UpdateSurveyAnswer(SurveyAnswer surveyDto)
    {
        throw new NotImplementedException();
    }

    public async Task<SurveyAnswer[]> GetSurveyAnswers()
    {
        return await sfDbContext.SurveyAnswers
            .Include(sa => sa.SurveyQuestion)
            .Include(sa => sa.SurveyResponse)
            .ToArrayAsync();
    }

    public Task<SurveyAnswer> GetSurveyAnswerDetails(int surveyId)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSurveyAnswers(int[] surveyIds)
    {
        throw new NotImplementedException();
    }
}