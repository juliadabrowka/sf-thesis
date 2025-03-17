using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sf.Models;

public class Trip
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public decimal Price { get; set; }
    public string Name { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
    public int ParticipantsCurrent { get; set; }
    public int ParticipantsTotal { get; set; }
    public TripType Type { get; set; }
    
    public Survey? Survey { get; set; }
    public int? SurveyId { get; set; }
    public int? ArticleId { get; set; }
    public Article? Article { get; set; }
    public ICollection<TripApplication> TripApplications { get; set; }
}