using AutoMapper;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface ISurveyResponseService
{
    Task<SurveyResponseDTO> CreateSurveyResponse(SurveyResponseDTO surveyResponseDto);
}

public class SurveyResponseService(ISurveyResponseRepository surveyResponseRepository, IMapper mapper) : ISurveyResponseService
{
    public async Task<SurveyResponseDTO> CreateSurveyResponse(SurveyResponseDTO surveyResponseDto)
    {
        var surveyResponse = mapper.Map<SurveyResponse>(surveyResponseDto);
        var newSurveyResponse = await surveyResponseRepository.CreateSurveyResponse(surveyResponse);

        return mapper.Map<SurveyResponseDTO>(newSurveyResponse);
    }
}