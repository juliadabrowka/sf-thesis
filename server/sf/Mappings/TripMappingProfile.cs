using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.TripApplicationIds,
                opt => opt.MapFrom(src => src.TripApplications.Select(t => t.Id).ToList()))
            .ForMember(dest => dest.TripTermDtos,
                opt => opt.MapFrom(src => src.TripTerms))
            .ReverseMap();

        CreateMap<TripDTO, Trip>()
            .ForMember(dest => dest.TripApplications,
                opt => opt.MapFrom(src => src.TripApplicationIds.Select(id => new TripApplication { Id = id })))
            .ForMember(dest => dest.TripTerms,
                opt => opt.MapFrom(src => src.TripTermDtos))
            .ReverseMap();
    }
}