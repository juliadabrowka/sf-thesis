namespace sf.Models;

public class SurveyQuestionDTO
{
    public int? Id { get; set; }
    public string Question { get; set; }
    public bool IsCommon { get; set; }
    
    public ICollection<int> SurveyIds { get; set; }
    public ICollection<SurveyDTO> SurveyDTOS { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
    public ICollection<SurveyAnswerDTO> SurveyAnswerDTOS { get; set; }
}