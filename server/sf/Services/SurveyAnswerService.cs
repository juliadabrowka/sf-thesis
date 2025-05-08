using AutoMapper;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface ISurveyAnswerService
{
    Task<SurveyAnswerDTO> CreateSurveyAnswer(SurveyAnswerDTO surveyDto);
    Task<SurveyAnswerDTO> UpdateSurveyAnswer(SurveyAnswerDTO surveyDto);
    Task<SurveyAnswerDTO[]> GetSurveyAnswers();
    Task<SurveyAnswerDTO> GetSurveyAnswerDetails(int surveyId);
    Task DeleteSurveyAnswers(int[] surveyIds);
}

public class SurveyAnswerService(
    ISurveyAnswerRepository surveyAnswerRepository, 
    IMapper mapper) : ISurveyAnswerService
{
    public Task<SurveyAnswerDTO> CreateSurveyAnswer(SurveyAnswerDTO surveyDto)
    {
        throw new NotImplementedException();
    }

    public Task<SurveyAnswerDTO> UpdateSurveyAnswer(SurveyAnswerDTO surveyDto)
    {
        throw new NotImplementedException();
    }

    public async Task<SurveyAnswerDTO[]> GetSurveyAnswers()
    {
        var surveyAnswers = await surveyAnswerRepository.GetSurveyAnswers();

        return mapper.Map<SurveyAnswerDTO[]>(surveyAnswers);
    }

    public Task<SurveyAnswerDTO> GetSurveyAnswerDetails(int surveyId)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSurveyAnswers(int[] surveyIds)
    {
        throw new NotImplementedException();
    }
}