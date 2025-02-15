namespace sf.Models;

public class TripDTO
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public Country Country { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
    public decimal Price { get; set; }
    public int ParticipantsCurrent { get; set; }
    public int ParticipantsTotal { get; set; }
    public TripType Type { get; set; }
    
    public int? SurveyId { get; set; }
    public List<int> ArticleIds { get; set; }
    public List<int> TripApplicationIds { get; set; }
}