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
            .ForMember(dest => dest.SurveyResponseId,
                opt => opt.MapFrom(src => src.SurveyResponse.Id))
            .ForMember(dest => dest.TripDTO,
                opt => opt.MapFrom(src => src.Trip))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}