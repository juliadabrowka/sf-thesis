using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyAnswerMappingProfile : Profile
{
    public SurveyAnswerMappingProfile()
    {
        CreateMap<SurveyAnswer, SurveyAnswerDTO>()
            .ForMember(dest => dest.SurveyQuestionId,
                opt => opt.MapFrom(src => src.SurveyQuestion != null ? src.SurveyQuestion.Id : (int?)null))
            .ForMember(dest => dest.SurveyResponseId,
                opt => opt.MapFrom(src => src.SurveyResponse != null ? src.SurveyResponse.Id : (int?)null))
            .ReverseMap();
    }
}