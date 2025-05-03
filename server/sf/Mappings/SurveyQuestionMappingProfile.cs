using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyQuestionMappingProfile : Profile
{
    public SurveyQuestionMappingProfile()
    {
        CreateMap<SurveyQuestion, SurveyQuestionDTO>()
            .ForMember(dest => dest.SurveyDTOS,
                opt =>
                {
                    opt.PreCondition(src => src.Surveys != null);
                    opt.MapFrom(src => src.Surveys);
                })
            .ForMember(dest => dest.SurveyIds,
                opt => opt.MapFrom(src => src.Surveys.Select(s => s.Id)))
            .ForMember(dest => dest.SurveyAnswerDTOS,
                opt => opt.MapFrom(src => src.SurveyAnswers))
            .ForMember(dest => dest.SurveyAnswerIds,
                            opt => opt.MapFrom(src => src.SurveyAnswers.Select(t => t.Id)))
            .ReverseMap();
    }
}