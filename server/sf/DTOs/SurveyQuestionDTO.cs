namespace sf.Models;

public class SurveyQuestionDTO
{
    public int? Id { get; set; }
    public string Question { get; set; }
    public bool isCommon { get; set; }
    
    public ICollection<int> SurveyIds { get; set; }
    public ICollection<SurveyDTO> SurveyDtos { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
    public ICollection<SurveyAnswerDTO> SurveyAnswerDtos { get; set; }
}