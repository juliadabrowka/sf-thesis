namespace sf.Models;

public class SurveyResponseDTO
{
    public int? Id { get; set; }
    public DateTime RepliedOn { get; set; }
    
    public int TripApplicationId { get; set; }
    public TripApplicationDTO TripApplication { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
    public ICollection<SurveyAnswerDTO> SurveyAnswerDtos { get; set; }
}