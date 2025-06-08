using System.ComponentModel.DataAnnotations;

namespace sf.Models;

public class AutosaveRequestDTO
{
    [Required]
    public int TripApplicationId { get; set; }
    [Required]
    public Dictionary<string, SurveyAnswerDTO> Responses { get; set; }
}
