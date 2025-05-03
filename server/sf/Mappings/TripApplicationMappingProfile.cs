using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripApplicationMappingProfile : Profile
{
    public TripApplicationMappingProfile()
    {
        CreateMap<TripApplication, TripApplicationDTO>()
            .ForMember(dest => dest.SurveyResponseDTO,
                opt => opt.MapFrom(src => src.SurveyResponse))
            .ForMember(dest => dest.TripDTO,
                opt => opt.MapFrom(src => src.Trip))
            .ReverseMap();
    }
}