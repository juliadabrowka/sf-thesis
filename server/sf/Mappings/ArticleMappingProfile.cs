using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class ArticleMappingProfile : Profile
{
    public ArticleMappingProfile()
    {
        CreateMap<Article, ArticleDTO>().ReverseMap();
    }
}