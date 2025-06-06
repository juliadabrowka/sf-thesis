using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ISurveyResponseRepository
{
    Task<SurveyResponse> CreateSurveyResponse(SurveyResponse surveyResponse);
}

public class SurveyResponseRepository(SfDbContext sfDbContext)  : ISurveyResponseRepository
{
    public async Task<SurveyResponse> CreateSurveyResponse(SurveyResponse surveyResponse)
    {
        await sfDbContext.SurveyResponses.AddAsync(surveyResponse);
        await sfDbContext.SaveChangesAsync();

        return surveyResponse;
    }
}