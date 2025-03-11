namespace sf.Models;

public class TripDTO
{
    public int? Id { get; set; }
    public decimal Price { get; set; }
    public int ParticipantsCurrent { get; set; }
    public int ParticipantsTotal { get; set; }
    public TripType Type { get; set; }
    
    public int? SurveyId { get; set; }
    public int ArticleId { get; set; }
    public List<int> TripApplicationIds { get; set; }
}