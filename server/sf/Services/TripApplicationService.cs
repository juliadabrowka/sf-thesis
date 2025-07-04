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

        if (!string.IsNullOrWhiteSpace(newTripApplication.Email))
        {
            await SendTripApplicationEmail(newTripApplication);
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
}

   public async Task AutosaveTripApplication(int tripApplicationId, Dictionary<string, SurveyAnswerDTO> responses) 
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
        
        if (tripApplication.Status != Status.InProgress)
        {
            tripApplication.Status = Status.InProgress;
        }

        await tripApplicationRepository.AutosaveTripApplication(tripApplication);
   }

   private async Task SendTripApplicationEmail(TripApplication newTripApplication)
   {
       
       var clientEmail = newTripApplication.Email;
       var hash = newTripApplication.Hash;

       if (!string.IsNullOrWhiteSpace(clientEmail))
       {
           var baseUrl = configuration["Frontend:TripApplicationUrlBase"] ?? "https://yourdomain.com/survey-fill";

           var surveyLink = $"{baseUrl}/{hash}";
           var emailBody = $@"
            <html>
              <body style='font-family: Arial, sans-serif; color: #333;'>
                <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
                  <div style='text-align: center; margin-bottom: 20px;'>
                    <img src='http://localhost:4200/assets/logotyp-superfemka.png' alt='Superfemka Logo' style='max-height: 60px;' />
                  </div>
                  <h2 style='color: #f04a7e;'>Wypełnij swoją ankietę</h2>
                  <p>Dziękujemy za zgłoszenie! Prosimy o wypełnienie ankiety dotyczącej Twojej wyprawy.</p>
                  <p style='margin: 30px 0; text-align: center;'>
                    <a href='{surveyLink}' style='background-color: #f04a7e; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;'>
                      Wypełnij ankietę
                    </a>
                  </p>
                  <p style='font-size: 12px; color: #888;'>Jeśli przycisk nie działa, skopiuj i wklej ten link w przeglądarce:<br /><a href='{surveyLink}'>{surveyLink}</a></p>
                </div>
              </body>
            </html>";

        
           await emailService.SendAsync(
               clientEmail,
               "Superfemka Projekt - ankieta na wyprawę",
               emailBody
           );
       }
   }
}