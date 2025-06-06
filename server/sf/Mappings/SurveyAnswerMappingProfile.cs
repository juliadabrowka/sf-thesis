using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyAnswerMappingProfile : Profile
{
    public SurveyAnswerMappingProfile()
    {
        CreateMap<SurveyAnswer, SurveyAnswerDTO>()
            .ForMember(dest => dest.SurveyResponseDTO,
                opt => opt.MapFrom(
                    src => src.SurveyResponse))
            .ForMember(dest => dest.SurveyQuestionDTO,
                opt => opt.MapFrom(
                    src => src.SurveyQuestion))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}