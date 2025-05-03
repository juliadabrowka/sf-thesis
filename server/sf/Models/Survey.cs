using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class Survey
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; }
    public string? ExtraLogoUrl { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public Country Country { get; set; }
    public ICollection<int> TripIds = new List<int>();
    public ICollection<Trip> Trips = new List<Trip>();
    public ICollection<int> SurveyQuestionIds = new List<int>();
    public ICollection<SurveyQuestion> SurveyQuestions = new List<SurveyQuestion>();
}