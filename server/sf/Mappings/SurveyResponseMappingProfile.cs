using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyResponseMappingProfile : Profile
{
    public SurveyResponseMappingProfile()
    {
        CreateMap<SurveyResponse, SurveyResponseDTO>()
            .ForMember(dest => dest.TripApplicationDTO,
                opt => opt.MapFrom(src => src.TripApplication))
            .ForMember(dest => dest.SurveyAnswerDTOS,
                opt => opt.MapFrom(
                    src => src.SurveyAnswers))
            .ForMember(dest => dest.SurveyAnswerIds,
                opt => opt.MapFrom(src => src.SurveyAnswers.Select(sa => sa.Id)))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}