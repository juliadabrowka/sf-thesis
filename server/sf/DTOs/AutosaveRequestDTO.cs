namespace sf.Models;

public class AutosaveRequestDTO
{
    public int TripApplicationId { get; set; }
    public Dictionary<string, SurveyAnswerDTO> Responses { get; set; }
}
