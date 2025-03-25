namespace sf.Models;

public class TripTermDTO
{
    public int? Id { get; set; }
    public decimal Price { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
    public int ParticipantsCurrent { get; set; }
    public int ParticipantsTotal { get; set; }
    
    public int? TripId { get; set; }
    public TripDTO? TripDto { get; set; }
}