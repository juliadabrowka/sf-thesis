using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripTermMappingProfile: Profile
{
    public TripTermMappingProfile()
    {
        CreateMap<TripTerm, TripTermDTO>()
            .ForMember(dest => dest.TripDto,
                opt =>
                {
                    opt.PreCondition(src => src.Trip != null);
                    opt.MapFrom(
                        src => src.Trip);
                })
            .MaxDepth(4)
            .PreserveReferences()
            .ReverseMap();
    }
}