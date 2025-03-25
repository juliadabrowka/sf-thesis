namespace sf.Models;

public class SurveyResponseDTO
{
    public int? Id { get; set; }
    public DateTime RepliedOn { get; set; }
    
    public int TripApplicationId { get; set; }
    public ICollection<int> SurveyAnswerIds { get; set; }
}