using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class OpinionMappingProfile : Profile
{
    public OpinionMappingProfile()
    {
        CreateMap<Opinion, OpinionDTO>().ReverseMap();
    }
}