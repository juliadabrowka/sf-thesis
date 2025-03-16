using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class TripController: ControllerBase
{
    private readonly ITripService _tripService;

    public TripController(ITripService tripService)
    {
        _tripService = tripService;
    }
    
    [HttpGet("tripList")]
    public async Task<ActionResult<TripDTO[]>> TripList()
    {
        var trips = await _tripService.GetTrips();
        return Ok(trips);
    }
    
    [HttpPost("createTrip")]
    public async Task<ActionResult<TripDTO>> CreateTrip(TripDTO tripDto)
    {
        if (tripDto.Id.HasValue)
        {
            TripDTO existingTrip = await _tripService.GetTripDetails(tripDto.Id.Value);
            if (existingTrip != null)
            {
                throw new ApplicationException("TripDTO with the provided ID already exists.");
            }
        }
        
        var trip = await _tripService.CreateTrip(tripDto);
        return Ok(trip);
    }

    [HttpPost("updateTrip")]
    public async Task<ActionResult<TripDTO>> UpdateTrip(TripDTO tripDto)
    {
        var trip = await _tripService.UpdateTrip(tripDto);
        return Ok(trip);
    }

    [HttpGet("trip/{tripId}")]
    public async Task<ActionResult<TripDTO>> TripDetails(int tripId)
    {
        var trip = await _tripService.GetTripDetails(tripId);
        return Ok(trip);
    }

    [HttpDelete("deleteTrips")]
    public async Task<ActionResult> DeleteTrips(int[] tripIds)
    {
        await _tripService.DeleteTrips(tripIds);
        return Ok();
    }
}