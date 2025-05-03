using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class SurveyDTO
{
    public int? Id { get; set; }
    public string Title { get; set; }
    public string? ExtraLogoUrl { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public Country Country { get; set; }
    
    public ICollection<int> TripIds { get; set; }
    public ICollection<TripDTO> TripDTOS { get; set; }
    public ICollection<int> SurveyQuestionIds { get; set; }
    public ICollection<SurveyQuestionDTO> SurveyQuestionDTOS { get; set; }
}