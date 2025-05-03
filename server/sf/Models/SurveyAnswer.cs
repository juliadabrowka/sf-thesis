using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sf.Models;

public class SurveyAnswer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Answer { get; set; }
    public int SurveyQuestionId { get; set; }
    public SurveyQuestion SurveyQuestion { get; set; }
    public int? SurveyResponseId { get; set; }
    public SurveyResponse? SurveyResponse { get; set; }
}