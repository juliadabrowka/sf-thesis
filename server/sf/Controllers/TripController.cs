using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class TripController(ITripService tripService) : ControllerBase
{
    [HttpGet("tripList")]
    public async Task<ActionResult<TripDTO[]>> TripList()
    {
        var trips = await tripService.GetTrip();
        return Ok(trips);
    }
    
    [HttpPost("createTrip")]
    public async Task<ActionResult<TripDTO>> CreateTrip(TripDTO tripDto)
    {
        TripDTO[] trips = await tripService.GetTrip();
        bool tripAlreadyExists = trips.Any(t => t.Id == tripDto.Id);
        if (tripAlreadyExists)
        {
            throw new ApplicationException("TripDTO already exists");
        }
        
        var trip = await tripService.CreateTrip(tripDto);
        return Ok(trip);
    }

    [HttpPost("updateTrip")]
    public async Task<ActionResult<TripDTO>> UpdateTrip(TripDTO tripDto)
    {
        var trip = await tripService.UpdateTrip(tripDto);
        return Ok(trip);
    }

    [HttpGet("trip/{tripId}")]
    public async Task<ActionResult<TripDTO>> TripDetails(int tripId)
    {
        var trip = await tripService.GetTripDetails(tripId);
        return Ok(trip);
    }
}