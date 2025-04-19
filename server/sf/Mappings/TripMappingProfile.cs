using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.TripApplicationDtos,
                opt => opt.MapFrom(
                    src => src.TripApplications))
            .ForMember(dest => dest.TripApplicationIds,
                opt => opt.MapFrom(
                    src => src.TripApplications.Select(ta => ta.Id)))
            .ForMember(dest => dest.TripTermDtos,
                opt => opt.MapFrom(
                    src => src.TripTerms))
            .ForMember(dest => dest.TripTermIds,
                opt => opt.MapFrom(
                    src => src.TripTerms.Select(tt => tt.Id)))
            .ForMember(dest => dest.ArticleDto,
                opt =>
                {
                    opt.PreCondition(c => c.Article != null);
                    opt.MapFrom(src => src.Article);
                })
            .MaxDepth(4)
            .PreserveReferences()
            .ForMember(dest => dest.ArticleId,
                opt => opt.MapFrom(
                    src => src.ArticleId))
            .ForMember(dest => dest.SurveyDto, 
                opt =>
                {
                    opt.PreCondition(src => src.Survey != null);
                    opt.MapFrom(
                        src => src.Survey);
                })
            .ReverseMap();
    }
}