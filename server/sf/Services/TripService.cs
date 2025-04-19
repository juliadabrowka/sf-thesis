using AutoMapper;
using sf.Models;
using sf.Program.Data;
using sf.Repositories;

namespace sf.Services;

public interface ITripService
{
    Task<TripDTO[]> GetTrips();
    Task<TripDTO> GetTripDetails(int tripId);
    Task<TripDTO> CreateTrip(TripDTO tripDto);
    Task<TripDTO> UpdateTrip(TripDTO tripDto);
    Task DeleteTrips(int[] tripIds);
}
public class TripService(
    ITripRepository tripRepository,
    IMapper mapper)
    : ITripService
{
    public async Task<TripDTO> CreateTrip(TripDTO tripDto)
    {
        var tripEntity = mapper.Map<Trip>(tripDto);
        
        var createdTrip = await tripRepository.CreateTrip(tripEntity);
        return mapper.Map<TripDTO>(createdTrip);
    }

    public async Task<TripDTO> UpdateTrip(TripDTO tripDto)
    {
        if (tripDto.Id == null)
        {
            throw new ApplicationException("This trip does not have id but should have");
        }
        var t = await tripRepository.GetTripDetails(tripDto.Id.Value);
        
        await tripRepository.UpdateTrip(t);
        return mapper.Map<TripDTO>(t);
    }

    public async Task DeleteTrips(int[] tripIds)
    {
        await tripRepository.DeleteTrips(tripIds);
    }

    public async Task<TripDTO[]> GetTrips()
    {
        var trips = await tripRepository.GetTrips();
        return mapper.Map<TripDTO[]>(trips);
    }
    
    public async Task<TripDTO> GetTripDetails(int tripId)
    {
        var trip = await tripRepository.GetTripDetails(tripId);
        return mapper.Map<TripDTO>(trip);
    }
}