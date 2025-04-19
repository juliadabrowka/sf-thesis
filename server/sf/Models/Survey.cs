using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sf.Models;

public class Survey
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; }
    public Country Country { get; set; }
    public int? TripId { get; set; }
    public Trip? Trip { get; set; }
    public ICollection<int> SurveyQuestionIds = new List<int>();
    public ICollection<SurveyQuestion> SurveyQuestions = new List<SurveyQuestion>();
}