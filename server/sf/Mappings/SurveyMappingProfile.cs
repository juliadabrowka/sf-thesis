using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyMappingProfile : Profile
{
    public SurveyMappingProfile()
    {
        CreateMap<Survey, SurveyDTO>()
            .ForMember(dest => dest.TripDTOS,
                opt => opt.MapFrom(src => src.Trips))
            .ForMember(dest => dest.TripIds,
                opt => opt.MapFrom(
                    src => src.Trips.Select(t => t.Id)))
            .ForMember(dest => dest.SurveyQuestionDTOS,
                opt => opt.MapFrom(
                    src => src.SurveyQuestions))
            .ForMember(dest => dest.SurveyQuestionIds,
                opt => opt.MapFrom(
                    src => src.SurveyQuestions.Select(sq => sq.Id)))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}