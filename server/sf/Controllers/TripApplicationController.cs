using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class TripApplicationController(ITripApplicationService tripApplicationService) : ControllerBase
{
    [HttpGet("tripApplicationList")]
    public async Task<ActionResult<TripApplicationDTO[]>> TripApplicationList()
    {
        var tripApplications = await tripApplicationService.GetTripApplications();
        return Ok(tripApplications);
    }
    
    [HttpPost("createTripApplication")]
    public async Task<ActionResult<TripApplicationDTO>> CreateTripApplication([FromBody] TripApplicationDTO tripApplicationDto)
    {
        if (tripApplicationDto.Id.HasValue)
        {
            TripApplicationDTO existingTripApplication =
                await tripApplicationService.GetTripApplicationsDetails(tripApplicationDto.Id.Value);

            if (existingTripApplication != null)
            {
                throw new ApplicationException("Trip applicationDto with given ID already exists");
            }
        }
        var tripApplication = await tripApplicationService.CreateTripApplication(tripApplicationDto);

        return Ok(tripApplication);
    }
    
    [HttpPost("updateTripApplication")]
    public async Task<ActionResult<TripApplicationDTO>> UpdateTripApplication(TripApplicationDTO tripApplicationDto)
    {
        var tripApplication = await tripApplicationService.UpdateTripApplication(tripApplicationDto);
        return Ok(tripApplication);
    }
    
    [HttpGet("tripApplications/{tripApplicationId}")]
    public async Task<ActionResult<TripApplicationDTO>> TripApplicationDetails(int tripApplicationId)
    {
        var tripApplicationDetails = await tripApplicationService.GetTripApplicationsDetails(tripApplicationId);
        return Ok(tripApplicationDetails);
    }
   
    [HttpGet("tripApplication/{hash}")]
    public async Task<ActionResult<TripApplicationDTO>> GetTripApplicationByHash(string hash)
    {
        var tripApplicationDto = await tripApplicationService.GetTripApplicationByHash(hash);

        return Ok(tripApplicationDto);
    }
    
    

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitTripApplication([FromBody] AutosaveRequestDTO submittedTripApplication)
    {
        await tripApplicationService.SubmitTripApplication(submittedTripApplication.TripApplicationId, submittedTripApplication.Responses);

        return Ok();
    }
    
    [HttpPost("autosave")]
    public async Task<IActionResult> AutosaveTripApplication([FromBody] AutosaveRequestDTO payload)
    {
        if (payload == null || payload.TripApplicationId <= 0 || payload.Responses == null)
        {
            return BadRequest("Invalid autosave request.");
        }

        await tripApplicationService.AutosaveTripApplication(payload.TripApplicationId, payload.Responses);
        return Ok();
    }

}