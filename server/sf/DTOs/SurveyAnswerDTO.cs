using System.ComponentModel.DataAnnotations;

namespace sf.Models;

public class SurveyAnswerDTO
{
    public int? Id { get; set; }
    [Required]
    public string Answer { get; set; }
    [Required]
    public int SurveyQuestionId { get; set; }
    [Required]
    public SurveyQuestionDTO SurveyQuestionDTO { get; set; }
    public int? SurveyResponseId { get; set; }
    public SurveyResponseDTO? SurveyResponseDTO { get; set; }
}