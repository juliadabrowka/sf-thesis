using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyResponseMappingProfile : Profile
{
    public SurveyResponseMappingProfile()
    {
        CreateMap<SurveyResponse, SurveyResponseDTO>()
            .ForMember(dest => dest.TripApplicationId,
                opt => opt.MapFrom(src => src.TripApplication.Id))
            .ForMember(dest => dest.SurveyAnswerIds,
                opt => opt.MapFrom(src => src.SurveyAnswers.Select(sa => sa.Id)))
            .ReverseMap();
    }
}