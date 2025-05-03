namespace sf.Models;

public class SurveyResponseDTO
{
    public int? Id { get; set; }
    public DateTime RepliedOn { get; set; }
    
    public int TripApplicationId { get; set; }
    public TripApplicationDTO TripApplicationDTO { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
    public ICollection<SurveyAnswerDTO> SurveyAnswerDTOS { get; set; }
}