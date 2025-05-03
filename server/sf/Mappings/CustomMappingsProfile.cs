using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class CustomMappingsProfile : Profile
{
    public CustomMappingsProfile()
    {
        // CreateMap<TripApplicationDTO, SurveyDTO>()
        //     .ForMember(dest => dest.TripIds, 
        //         opt => opt.MapFrom(
        //             src => new List<int> { src.TripId }))
        //     .ForMember(dest => dest.TripDTOS, opt => opt.MapFrom(src => new List<TripDTO> { src.TripDTO }));
        //
        // CreateMap<TripDTO, SurveyDTO>()
        //     .ForMember(dest => dest.SurveyQuestionDTOS, opt => opt.MapFrom(src => src.SurveyDTO));
        //
        // CreateMap<TripDTO, TripApplicationDTO>()
        //     .ForMember(dest => dest.TripDTO, opt => opt.MapFrom(src => src));
    }
}