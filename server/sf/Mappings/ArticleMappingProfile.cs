using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class ArticleMappingProfile : Profile
{
    public ArticleMappingProfile()
    {
        CreateMap<Article, ArticleDTO>()
            .ForMember(
                dest => dest.TripDTO,
                opt => opt.MapFrom(
                    src => src.Trip))
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}