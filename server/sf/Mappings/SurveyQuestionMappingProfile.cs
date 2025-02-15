using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyQuestionMappingProfile : Profile
{
    public SurveyQuestionMappingProfile()
    {
        CreateMap<SurveyQuestion, SurveyQuestionDTO>()
            .ForMember(dest => dest.SurveyIds,
                opt => opt.MapFrom(src => src.Surveys.Select(p => p.Id)))
            .ForMember(dest => dest.SurveyAnswerIds,
                opt => opt.MapFrom(src => src.SurveyAnswers.Select(t => t.Id)))
            .ForMember(dest => dest.QuestionText,
                opt => opt.MapFrom(src => src.Question))
            .ReverseMap();
    }
}