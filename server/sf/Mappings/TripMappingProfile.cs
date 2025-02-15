using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{ 
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.ArticleIds,
                opt => opt.MapFrom(src => src.Articles.Select(p => p.Id)))
            .ForMember(dest => dest.TripApplicationIds,
                opt => opt.MapFrom(src => src.TripApplications.Select(t => t.Id)))
            .ForMember(dest => dest.SurveyId,
                opt => opt.MapFrom(src => src.Survey != null ? src.Survey.Id : (int?)null))
            .ReverseMap()
            .ForMember(dest => dest.Survey, opt => opt.Condition(src => src.SurveyId.HasValue)) // Only set Survey if SurveyId exists
            .ForMember(dest => dest.Survey, opt => opt.Ignore());
    }
}