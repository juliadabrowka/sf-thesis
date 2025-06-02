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
    [Required]
    [MaxLength(200)]
    public string Title { get; set; }
    [MaxLength(500)]
    public string? ExtraLogoUrl { get; set; }
    [Required]
    [JsonConverter(typeof(StringEnumConverter))]
    public Country Country { get; set; }
    public ICollection<int> TripIds = new List<int>();
    public ICollection<Trip> Trips = new List<Trip>();
    public ICollection<int> SurveyQuestionIds = new List<int>();
    public ICollection<SurveyQuestion> SurveyQuestions = new List<SurveyQuestion>();
}