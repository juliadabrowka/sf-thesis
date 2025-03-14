using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyMappingProfile : Profile
{
    public SurveyMappingProfile()
    {
        CreateMap<Survey, SurveyDTO>()
            .ForMember(dest => dest.SurveyQuestionIds,
                opt => opt.MapFrom(
                    src => src.SurveyQuestions.Select(sq => sq.Id)))
            .ForMember(dest => dest.TripId,
                opt => opt.MapFrom(
                    src => src.Trip != null ? src.Trip.Id : (int?)null))
            .ReverseMap();
    }
}