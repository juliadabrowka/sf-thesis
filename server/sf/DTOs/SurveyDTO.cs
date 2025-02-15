namespace sf.Models;

public class SurveyDTO
{
    public int? Id { get; set; }
    public string Title { get; set; }
    public Country Country { get; set; }
    
    public int? TripId { get; set; }
    public List<int> SurveyQuestionIds { get; set; }
}