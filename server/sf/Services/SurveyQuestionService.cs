using AutoMapper;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface ISurveyQuestionService
{
    Task<SurveyQuestionDTO> CreateSurveyQuestion(SurveyQuestionDTO surveyQuestionDto);
    Task<SurveyQuestionDTO> UpdateSurveyQuestion(SurveyQuestionDTO surveyQuestionDto);
    Task<SurveyQuestionDTO[]> GetSurveyQuestions();
    Task<SurveyQuestionDTO> GetSurveyQuestionDetails(int surveyQuestionId);
    Task DeleteSurveyQuestions(int[] surveyQuestionIds);
}
public class SurveyQuestionService(
    ISurveyQuestionRepository surveyQuestionRepository,
    IMapper mapper,
    ISurveyRepository surveyRepository
    )
    : ISurveyQuestionService
{
    public async Task<SurveyQuestionDTO> CreateSurveyQuestion(SurveyQuestionDTO surveyQuestionDto)
    {
        var surveyQuestionEntity = mapper.Map<SurveyQuestion>(surveyQuestionDto);
        var newSurveyQuestion = await surveyQuestionRepository.CreateSurveyQuestion(surveyQuestionEntity);
        return mapper.Map<SurveyQuestionDTO>(newSurveyQuestion);
    }

    public async Task<SurveyQuestionDTO> UpdateSurveyQuestion(SurveyQuestionDTO surveyQuestionDto)
    {
        if (!surveyQuestionDto.Id.HasValue)
        {
            throw new ApplicationException("This survey question does not have an ID but should have.");
        }

        var sq = await surveyQuestionRepository.GetSurveyQuestionDetails(surveyQuestionDto.Id.Value);

        if (sq == null)
        {
            throw new ApplicationException($"Survey question with ID {surveyQuestionDto.Id.Value} not found.");
        }

        bool isUpdated = false;

        if (sq.IsCommon != surveyQuestionDto.IsCommon)
        {
            sq.IsCommon = surveyQuestionDto.IsCommon;
             isUpdated = true;
        }

        if (!sq.Surveys.Select(s => s.Id).OrderBy(id => id).SequenceEqual(surveyQuestionDto.SurveyIds.OrderBy(id => id)))
        {
            List<Survey> surveys = new List<Survey>();
            foreach (var surveyId in surveyQuestionDto.SurveyIds)
            {
                var s = await surveyRepository.GetSurveyDetails(surveyId);
                surveys.Add(s);
            }

            sq.Surveys = surveys.ToArray();
            isUpdated = true;
        }

        if (sq.Question != surveyQuestionDto.Question)
        {
            sq.Question = surveyQuestionDto.Question;
            isUpdated = true;
        }

        if (isUpdated)
        {
            await surveyQuestionRepository.UpdateSurveyQuestion(sq);
        }

        return mapper.Map<SurveyQuestionDTO>(sq);
    }

    public async Task<SurveyQuestionDTO[]> GetSurveyQuestions()
    {
        var questions = await surveyQuestionRepository.GetSurveyQuestions();
        return mapper.Map<SurveyQuestionDTO[]>(questions);
    }

    public async Task<SurveyQuestionDTO> GetSurveyQuestionDetails(int surveyQuestionId)
    {
        var surveyQuestion = await surveyQuestionRepository.GetSurveyQuestionDetails(surveyQuestionId);
        return mapper.Map<SurveyQuestionDTO>(surveyQuestion);
    }

    public async Task DeleteSurveyQuestions(int[] surveyQuestionIds)
    {
        await surveyQuestionRepository.DeleteSurveyQuestions(surveyQuestionIds);
    }
}