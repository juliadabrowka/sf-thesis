namespace sf.Models;

public class SurveyAnswerDTO
{
    public int? Id { get; set; }
    public string Answer { get; set; }
    public int SurveyQuestionId { get; set; }
    public SurveyQuestionDTO SurveyQuestionDto { get; set; }
    public int SurveyResponseId { get; set; }
    public SurveyResponseDTO SurveyResponseDto { get; set; }
}