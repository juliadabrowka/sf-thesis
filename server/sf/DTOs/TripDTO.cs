using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class TripDTO
{
    public int? Id { get; set; }
    public string Name { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public TripType Type { get; set; }
    public ICollection<int> TripTermIds { get; set; }
    public ICollection<TripTermDTO> TripTermDtos { get; set; }
    public int? SurveyId { get; set; }
    public SurveyDTO? SurveyDto { get; set; }
    public int? ArticleId { get; set; }
    public ArticleDTO? ArticleDto { get; set; }
    public ICollection<int> TripApplicationIds { get; set; }
    public ICollection<TripApplicationDTO> TripApplicationDtos { get; set; }
}