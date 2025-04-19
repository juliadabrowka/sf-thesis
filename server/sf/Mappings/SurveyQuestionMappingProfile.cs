using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyQuestionMappingProfile : Profile
{
    public SurveyQuestionMappingProfile()
    {
        CreateMap<SurveyQuestion, SurveyQuestionDTO>()
            .ForMember(dest => dest.SurveyDtos,
                opt => opt.MapFrom(src => src.Surveys))
            .ForMember(dest => dest.SurveyAnswerIds,
                opt => opt.MapFrom(src => src.SurveyAnswers.Select(t => t.Id)))
            .ForMember(dest => dest.SurveyIds,
                opt => opt.MapFrom(src => src.Surveys.Select(s => s.Id)))
            .ForMember(dest => dest.SurveyAnswerDtos,
                opt => opt.MapFrom(src => src.SurveyAnswers))
            .ReverseMap();
    }
}