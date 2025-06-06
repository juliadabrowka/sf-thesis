using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.TripApplicationDTOS,
                opt => opt.MapFrom(
                    src => src.TripApplications))
            .ForMember(dest => dest.TripApplicationIds,
                opt => opt.MapFrom(
                    src => src.TripApplications.Select(ta => ta.Id)))
            .ForMember(dest => dest.TripTermDTOS,
                opt => opt.MapFrom(
                    src => src.TripTerms))
            .ForMember(dest => dest.TripTermIds,
                opt => opt.MapFrom(
                    src => src.TripTerms.Select(tt => tt.Id)))
            .ForMember(dest => dest.ArticleDTO,
                opt => opt.MapFrom(src => src.Article))
            .ForMember(dest => dest.ArticleId,
                opt => opt.MapFrom(
                    src => src.Article.Id))
            .ForMember(dest => dest.SurveyDTO, 
                opt => opt.MapFrom(
                        src => src.Survey))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}