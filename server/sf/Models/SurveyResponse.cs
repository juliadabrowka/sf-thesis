using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sf.Models;

public class SurveyResponse
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime RepliedOn { get; set; }
    
    [ForeignKey("TripApplication")]
    public int TripApplicationId { get; set; }
    public TripApplication TripApplication { get; set; }
    public ICollection<int> SurveyAnswerIds = new List<int>();
    public ICollection<SurveyAnswer> SurveyAnswers = new List<SurveyAnswer>();
}