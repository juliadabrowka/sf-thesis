using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class TripTermDTO
{
    public int? Id { get; set; }
    public decimal Price { get; set; }
    public string Name { get; set; }
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }
    public int ParticipantsCurrent { get; set; }
    public int ParticipantsTotal { get; set; }
    public int FreeSpots => ParticipantsTotal - ParticipantsCurrent;
    
    public int? TripId { get; set; }
    public TripDTO? TripDTO { get; set; }
}