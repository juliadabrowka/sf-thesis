using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class Trip
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public TripType Type { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public Difficulty TripDifficulty { get; set; }
    public ICollection<TripTerm> TripTerms { get; set; }
    public int? SurveyId { get; set; }
    public Survey? Survey { get; set; }
    public int? ArticleId { get; set; }
    public Article? Article { get; set; }
    public ICollection<TripApplication> TripApplications = new List<TripApplication>();
}