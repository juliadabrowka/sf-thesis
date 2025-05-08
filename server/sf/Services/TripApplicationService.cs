using AutoMapper;
using sf.Controllers;
using sf.Models;
using sf.Repositories;

namespace sf.Services;

public interface ITripApplicationService
{
    Task<TripApplicationDTO> GetTripApplicationByHash(string hash);
    Task<TripApplicationDTO> GetTripApplicationsDetails(int id);
    Task<TripApplicationDTO> CreateTripApplication(TripApplicationDTO tripApplicationDto);
    Task<TripApplicationDTO[]> GetTripApplications();
    Task<TripApplicationDTO> UpdateTripApplication(TripApplicationDTO tripApplicationDto);
    Task SubmitTripApplication(int tripApplicationDto, Dictionary<string, SurveyAnswerDTO> responses);
    Task AutosaveTripApplication(int requestTripApplicationId, Dictionary<string, SurveyAnswerDTO> requestResponses);
}

public class TripApplicationService(
    IMapper mapper,
    ITripApplicationRepository tripApplicationRepository,
    IConfiguration configuration,
    IEmailService emailService
    ) : ITripApplicationService
{
    public async Task<TripApplicationDTO> GetTripApplicationByHash(string hash)
    {
        var tripApplication = await tripApplicationRepository.GetTripApplicationByHash(hash);
        
        return mapper.Map<TripApplicationDTO>(tripApplication);
    }

    public async Task<TripApplicationDTO> GetTripApplicationsDetails(int tripApplicationId)
    {
        var tripApplication = await tripApplicationRepository.GetTripApplicationsDetails(tripApplicationId);
        return mapper.Map<TripApplicationDTO>(tripApplication);
    }

    public async Task<TripApplicationDTO> CreateTripApplication(TripApplicationDTO tripApplicationDto)
    {
        if (tripApplicationDto == null)
        {
            throw new AggregateException("No tripApplication passed to create");
        }

        var tripApplicationEntity = mapper.Map<TripApplication>(tripApplicationDto);
        var newTripApplication = await tripApplicationRepository.CreateTripApplication(tripApplicationEntity);
        // come back to see if anything should be mapped
        
        var clientEmail = newTripApplication.Email;
        var hash = newTripApplication.Hash;

        if (!string.IsNullOrWhiteSpace(clientEmail))
        {
            var baseUrl = configuration["Frontend:TripApplicationUrlBase"] ?? "https://yourdomain.com/survey-fill";
            var surveyLink = $"{baseUrl}/{hash}";
        
            await emailService.SendAsync(
                clientEmail,
                "Wypełnij swoją ankietę",
                $"Kliknij link, aby wypełnić ankietę: <a href=\"{surveyLink}\">{surveyLink}</a>"
            );
        }

        return mapper.Map<TripApplicationDTO>(newTripApplication);
    }

    public async Task<TripApplicationDTO[]> GetTripApplications()
    {
        var tripApplications = await tripApplicationRepository.GetTripApplications();

        return mapper.Map<TripApplicationDTO[]>(tripApplications);
    }

    public async Task<TripApplicationDTO> UpdateTripApplication(TripApplicationDTO tripApplicationDto)
    {
        if (!tripApplicationDto.Id.HasValue)
        {
            throw new ApplicationException("This tripApplication does not have an ID but should have.");
        }

        var tripApplication = await tripApplicationRepository.GetTripApplicationsDetails(tripApplicationDto.Id.Value);

        if (tripApplication == null)
        {
            throw new ApplicationException($"Article with ID {tripApplicationDto.Id.Value} not found.");
        }

        bool isUpdated = false;
        if (tripApplication.Status != tripApplicationDto.Status)
        {
            isUpdated = true;
            tripApplication.Status = tripApplicationDto.Status;
        }

        if (tripApplication.SourceOfInformation != tripApplicationDto.SourceOfInformation)
        {
            isUpdated = true;
            tripApplication.SourceOfInformation = tripApplicationDto.SourceOfInformation;
        }

        foreach (SurveyAnswer surveyAnswer in tripApplication.SurveyResponse.SurveyAnswers)
        {
            foreach (SurveyAnswerDTO surveyAnswerDto in tripApplicationDto.SurveyResponseDTO.SurveyAnswerDTOS)
            {
              if (surveyAnswer.Answer != surveyAnswerDto.Answer)
             {
                // TODO
             }  
            }
        }
        

        if (isUpdated)
        {
            await tripApplicationRepository.UpdateTripApplication(tripApplication);
        }

        return mapper.Map<TripApplicationDTO>(tripApplication);
    }

   public async Task SubmitTripApplication(int tripApplicationId, Dictionary<string, SurveyAnswerDTO> responses)
{
    var tripApplication = await tripApplicationRepository
        .GetTripApplicationsDetails(tripApplicationId);

    if (tripApplication == null)
    {
        throw new Exception($"TripApplication with ID {tripApplicationId} not found.");
    }

    var surveyResponse = tripApplication.SurveyResponse ?? new SurveyResponse
    {
        TripApplicationId = tripApplicationId,
        RepliedOn = DateTime.UtcNow,
        SurveyAnswers = new List<SurveyAnswer>()
    };

    foreach (var (questionIdStr, dto) in responses)
    {
        if (!int.TryParse(questionIdStr, out var questionId))
        {
            continue;
        }

        var existingAnswer = surveyResponse.SurveyAnswers
            .FirstOrDefault(a => a.SurveyQuestionId == questionId);

        if (existingAnswer != null)
        {
            existingAnswer.Answer = dto.Answer;
        }
        else
        {
            surveyResponse.SurveyAnswers.Add(new SurveyAnswer
            {
                SurveyQuestionId = questionId,
                Answer = dto.Answer
            });
        }
    }

    if (tripApplication.SurveyResponse == null)
    {
        tripApplication.SurveyResponse = surveyResponse;
    }

    tripApplication.Status = Status.Completed;
    tripApplication.AppliedAt = DateTime.UtcNow;

    await tripApplicationRepository.SubmitTripApplication(tripApplication);

    // TODO: CONFIRMATION EMAIL?
}

   public async Task AutosaveTripApplication(int tripApplicationId, Dictionary<string, SurveyAnswerDTO> responses) 
   {
    var tripApp = await tripApplicationRepository
        .GetTripApplicationsDetails(tripApplicationId);

    if (tripApp == null)
    {
        throw new Exception($"TripApplication with ID {tripApplicationId} not found.");
    }

    var surveyResponse = tripApp.SurveyResponse ?? new SurveyResponse
    {
        TripApplicationId = tripApplicationId,
        RepliedOn = DateTime.UtcNow,
        SurveyAnswers = new List<SurveyAnswer>()
    };

    foreach (var (questionIdStr, dto) in responses)
    {
        if (!int.TryParse(questionIdStr, out var questionId))
        {
            continue;
        }

        var existingAnswer = surveyResponse.SurveyAnswers
            .FirstOrDefault(a => a.SurveyQuestionId == questionId);

        if (existingAnswer != null)
        {
            existingAnswer.Answer = dto.Answer;
        }
        else
        {
            surveyResponse.SurveyAnswers.Add(new SurveyAnswer
            {
                SurveyQuestionId = questionId,
                Answer = dto.Answer
            });
        }
    }

    if (tripApp.SurveyResponse == null)
    {
        tripApp.SurveyResponse = surveyResponse;
    }
    
    if (tripApp.Status != Status.InProgress)
    {
        tripApp.Status = Status.InProgress;
    }

    await tripApplicationRepository.AutosaveTripApplication(tripApp);
    }
}