using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripTermMappingProfile: Profile
{
    public TripTermMappingProfile()
    {
        CreateMap<TripTerm, TripTermDTO>().ReverseMap();
    }
}