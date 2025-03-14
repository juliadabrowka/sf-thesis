using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class ArticleMappingProfile : Profile
{
    public ArticleMappingProfile()
    {
        CreateMap<Article, ArticleDTO>()
            .ForMember(
                dest => dest.TripDto,
                opt => opt.MapFrom(
                    src => src.Trip));

        CreateMap<ArticleDTO, Article>()
            .ForMember(
                dest => dest.Trip,
                opt => opt.MapFrom(
                    src => src.TripDto));
    }
}