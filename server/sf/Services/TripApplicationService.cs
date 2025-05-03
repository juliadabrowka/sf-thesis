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
            var baseUrl = configuration["Frontend:SurveyUrlBase"] ?? "https://yourdomain.com/survey-fill";
            var surveyLink = $"{baseUrl}/{hash}";
        
            await emailService.SendAsync(
                clientEmail,
                "Wypełnij swoją ankietę",
                $"Kliknij link, aby wypełnić ankietę: <a href=\"{surveyLink}\">{surveyLink}</a>"
            );
        }

        return mapper.Map<TripApplicationDTO>(newTripApplication);
    }
}