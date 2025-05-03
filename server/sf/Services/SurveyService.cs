using AutoMapper;
using sf.Migrations;
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
    Task<SurveyDTO> GetSurveyByHash(string hash);
}
public class SurveyService(
    ISurveyRepository surveyRepository, 
    IMapper mapper,
    ISurveyQuestionRepository surveyQuestionRepository,
    ITripRepository tripRepository
    ) : ISurveyService
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

    public async Task<SurveyDTO> UpdateSurvey(SurveyDTO surveyDto)
    {
        if (!surveyDto.Id.HasValue)
        {
            throw new ApplicationException("This survey does not have an ID but should have.");
        }

        var survey = await surveyRepository.GetSurveyDetails(surveyDto.Id.Value);

        if (survey == null)
        {
            throw new ApplicationException($"Survey with ID {surveyDto.Id.Value} not found.");
        }
        bool isUpdated = false;
        
        if (survey.Title != surveyDto.Title)
        {
            survey.Title = surveyDto.Title;
            isUpdated = true;
        }
        
        if (survey.ExtraLogoUrl != surveyDto.ExtraLogoUrl)
        {
            survey.ExtraLogoUrl = surveyDto.ExtraLogoUrl;
            isUpdated = true;
        }
        
        if (survey.Country != surveyDto.Country)
        {
            survey.Country = surveyDto.Country;
            isUpdated = true;
        }

        // trips
        var surveyTripIds = new HashSet<int>(survey.TripIds);
        var surveyDtoTripIds = new HashSet<int>(surveyDto.TripIds);
        
        if (!surveyTripIds.SetEquals(surveyDtoTripIds))
        {
            isUpdated = true;
            
            survey.TripIds = surveyDto.TripIds.ToList();
            survey.Trips = await tripRepository.GetTripsByIds(survey.TripIds);        
        }
        
        // questions
        var surveyQuestionIds = new HashSet<int>(survey.SurveyQuestionIds);
        var surveyDtoQuestionIds = new HashSet<int>(surveyDto.SurveyQuestionIds);

        
        if (!surveyQuestionIds.SetEquals(surveyDtoQuestionIds))
        {
            isUpdated = true;
            
            foreach (var surveyQuestionDto in surveyDto.SurveyQuestionDTOS)
            {
                if (surveyQuestionDto.Id != null)
                {
                    SurveyQuestion existingQuestion =
                        await surveyQuestionRepository.GetSurveyQuestionDetails(surveyQuestionDto.Id.Value);
                    var updatesSurveyQuestion = CompareSurveyQuestions(existingQuestion, surveyQuestionDto);
                    await surveyQuestionRepository.UpdateSurveyQuestion(updatesSurveyQuestion);
                }
                else
                {
                    var newSurveyQuestion = mapper.Map<SurveyQuestion>(surveyQuestionDto);
                    var surveyQuestionEntity = await surveyQuestionRepository.CreateSurveyQuestion(newSurveyQuestion);
                    survey.SurveyQuestions.Add(surveyQuestionEntity);
                }
            }

            survey.SurveyQuestionIds = survey.SurveyQuestions.Select(sq => sq.Id).ToList();
        }
        
        if (isUpdated)
        {
            await surveyRepository.UpdateSurvey(survey);
        }

        return mapper.Map<SurveyDTO>(survey);
    }

    public async Task<SurveyDTO[]> GetSurveys()
    {
        var surveys = await surveyRepository.GetSurveys();

        return mapper.Map<SurveyDTO[]>(surveys);
    }

    public async Task<SurveyDTO> GetSurveyDetails(int surveyId)
    {
        var surveyDetails = await surveyRepository.GetSurveyDetails(surveyId);
        return mapper.Map<SurveyDTO>(surveyDetails);
    }

    public async Task DeleteSurveys(int[] surveyIds)
    {
        await surveyRepository.DeleteSurveys(surveyIds);
    }

    public async Task<SurveyDTO> GetSurveyByHash(string hash)
    {
        var survey = await surveyRepository.GetSurveyByHash(hash);
        
        return mapper.Map<SurveyDTO>(survey);
    }

    private SurveyQuestion CompareSurveyQuestions(SurveyQuestion existingQuestion,
        SurveyQuestionDTO surveyQuestionDto)
    {
        if (existingQuestion.Question != surveyQuestionDto.Question)
        {
            existingQuestion.Question = surveyQuestionDto.Question;
        }

        if (existingQuestion.IsCommon != surveyQuestionDto.IsCommon)
        {
            existingQuestion.IsCommon = surveyQuestionDto.IsCommon;
        }

        return existingQuestion;
    }
}