using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class TripApplication
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string ExtraInfo { get; set; }
    public string? Hash { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public Status Status { get; set; }
    public DateTime AppliedAt { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public SourceOfInformation? SourceOfInformation { get; set; }
    
    public int TripId { get; set; }
    public Trip Trip { get; set; }
    public int? SurveyResponseId { get; set; }
    public SurveyResponse? SurveyResponse { get; set; }
}