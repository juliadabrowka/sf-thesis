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
}
public class TripService : ITripService
{
    private readonly ITripRepository _tripRepository;
    private readonly IMapper _mapper;
    private readonly SfDbContext _sfDbContext;
    private readonly IArticleService _articleService;

    public TripService(ITripRepository tripRepository, IMapper mapper)
    {
        _tripRepository = tripRepository;
        _mapper = mapper;
    }

    public async Task<TripDTO> CreateTrip(TripDTO tripDto)
    {
        var tripEntity = _mapper.Map<Trip>(tripDto);
        
        var createdTrip = await _tripRepository.CreateTrip(tripEntity);
        return _mapper.Map<TripDTO>(createdTrip);
    }

    public async Task<TripDTO> UpdateTrip(TripDTO tripDto)
    {
        if (tripDto.Id == null)
        {
            throw new ApplicationException("This trip does not have id but should have");
        }
        var t = await _tripRepository.GetTripDetails(tripDto.Id.Value);
        
        await _tripRepository.UpdateTrip(t);
        return _mapper.Map<TripDTO>(t);
    }

    public async Task<TripDTO[]> GetTrips()
    {
        var trips = await _tripRepository.GetTrips();
        return _mapper.Map<TripDTO[]>(trips);
    }
    
    public async Task<TripDTO> GetTripDetails(int tripId)
    {
        var trip = await _tripRepository.GetTripDetails(tripId);
        return _mapper.Map<TripDTO>(trip);
    }
}