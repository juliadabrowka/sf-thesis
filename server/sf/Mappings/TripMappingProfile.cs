using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.ArticleId, opt => opt.MapFrom(src => src.ArticleId))
            .ForMember(dest => dest.TripApplicationIds, 
                opt => opt.MapFrom(src => src.TripApplications.Select(t => t.Id).ToList()))
            .ForMember(dest => dest.SurveyId, opt => opt.MapFrom(src => src.Survey != null ? src.Survey.Id : (int?)null))
            .ForMember(dest => dest.ArticleId, opt => opt.Ignore()); // ✅ Fix circular dependency

        CreateMap<TripDTO, Trip>()
            .ForMember(dest => dest.ArticleId, opt => opt.Ignore()) // ✅ Prevent circular mapping
            .ForMember(dest => dest.TripApplications, opt => opt.Ignore()) 
            .ForMember(dest => dest.Survey, opt => opt.MapFrom(src => src.SurveyId.HasValue ? new Survey { Id = src.SurveyId.Value } : null));

    }
}