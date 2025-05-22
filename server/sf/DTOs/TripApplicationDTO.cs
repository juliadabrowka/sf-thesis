using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class TripApplicationDTO
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string ExtraInfo { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public Status Status { get; set;}
    public DateTime AppliedAt { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public SourceOfInformation? SourceOfInformation { get; set; }
    public int TripId { get; set; }
    public TripDTO? TripDTO { get; set; }
    public int? SurveyResponseId { get; set; }
    public SurveyResponseDTO? SurveyResponseDTO { get; set; }
}