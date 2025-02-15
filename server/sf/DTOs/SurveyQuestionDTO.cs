namespace sf.Models;

public class SurveyQuestionDTO
{
    public int? Id { get; set; }
    public string QuestionText { get; set; }
    public bool isCommon { get; set; }
    
    public List<int> SurveyIds { get; set; }
    public List<int> SurveyAnswerIds { get; set; }
}