using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class TripApplicationController(ITripApplicationService tripApplicationService) : ControllerBase
{
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
}