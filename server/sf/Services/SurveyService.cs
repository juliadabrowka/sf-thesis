using AutoMapper;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface ISurveyService
{
    Task<SurveyDTO> CreateSurvey(SurveyDTO surveyDto);
    Task<SurveyDTO> UpdateSurvey(SurveyDTO surveyDto);
    Task<SurveyDTO[]> GetSurveys();
    Task<SurveyDTO> GetSurveyDetails(int surveyId);
    Task DeleteSurveys(int[] surveyIds);
}
public class SurveyService(ISurveyRepository surveyRepository, IMapper mapper) : ISurveyService
{
    public async Task<SurveyDTO> CreateSurvey(SurveyDTO surveyDto)
    {
        if (surveyDto == null)
        {
            throw new AggregateException("No survey passed to create");
        }

        var surveyEntity = mapper.Map<Survey>(surveyDto);
        
        var newSurvey = await surveyRepository.CreateSurvey(surveyEntity);
        newSurvey.SurveyQuestionIds = newSurvey.SurveyQuestions.Select(sq => sq.Id).ToArray();
        await surveyRepository.UpdateSurvey(newSurvey);

        return mapper.Map<SurveyDTO>(newSurvey);
    }

    public Task<SurveyDTO> UpdateSurvey(SurveyDTO surveyDto)
    {
        throw new NotImplementedException();
    }

    public Task<SurveyDTO[]> GetSurveys()
    {
        throw new NotImplementedException();
    }

    public Task<SurveyDTO> GetSurveyDetails(int surveyId)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSurveys(int[] surveyIds)
    {
        throw new NotImplementedException();
    }
}