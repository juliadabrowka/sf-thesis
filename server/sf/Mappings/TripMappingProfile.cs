using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class TripMappingProfile : Profile
{
    public TripMappingProfile()
    {
        CreateMap<Trip, TripDTO>()
            .ForMember(dest => dest.ArticleDto,
                opt => opt.MapFrom(src => src.Article))
            .ForMember(dest => dest.TripApplicationIds,
                opt => opt.MapFrom(src => src.TripApplications.Select(t => t.Id).ToList()))
            .ForMember(dest => dest.TripTermDtos,
                opt => opt.MapFrom(src => src.TripTerms.Select(tt => new TripTermDTO
                {
                    Id = tt.Id,
                    DateFrom = tt.DateFrom,
                    DateTo = tt.DateTo
                }).ToList()))
            .ReverseMap();
    }
}