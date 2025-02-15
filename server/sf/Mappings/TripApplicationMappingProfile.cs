using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripApplicationMappingProfile : Profile
{
    public TripApplicationMappingProfile()
    {
        CreateMap<TripApplication, TripApplicationDTO>()
            .ForMember(dest => dest.SurveyResponseId,
                opt => opt.MapFrom(src => src.SurveyResponse != null ? src.SurveyResponse.Id : (int?)null))
            .ForMember(dest => dest.TripId,
                opt => opt.MapFrom(src => src.Trip.Id))
            .ReverseMap();
    }
}