using AutoMapper;
using sf.Models;

namespace sf.Program.Mappings;

public class SurveyMappingProfile : Profile
{
    public SurveyMappingProfile()
    {
        CreateMap<Survey, SurveyDTO>()
            .ForMember(dest => dest.TripDto,
                opt =>
                {
                    opt.PreCondition(src => src.Trip != null);
                    opt.MapFrom(src => src.Trip);
                })
            .MaxDepth(4)
            .PreserveReferences()
            .ForMember(dest => dest.SurveyQuestionDtos,
                opt => opt.MapFrom(
                    src => src.SurveyQuestions))
            .ForMember(dest => dest.SurveyQuestionIds,
                opt => opt.MapFrom(
                    src => src.SurveyQuestions.Select(sq => sq.Id)));

        CreateMap<SurveyDTO, Survey>()
            .ForMember(dest => dest.Trip, opt => opt.Ignore()) // prevent accidental Trip insert
            .ForMember(dest => dest.SurveyQuestions,
                opt => opt.MapFrom(
                    src => src.SurveyQuestionDtos)); // map manually if needed
    }
}