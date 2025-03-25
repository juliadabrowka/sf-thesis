namespace sf.Models;

public class SurveyQuestionDTO
{
    public int? Id { get; set; }
    public string QuestionText { get; set; }
    public bool isCommon { get; set; }
    
    public ICollection<int> SurveyIds { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
}