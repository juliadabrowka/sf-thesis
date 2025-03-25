using Newtonsoft.Json;

namespace sf.Models;

public class TripDTO
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public TripType Type { get; set; }
    public ICollection<TripTermDTO> TripTermDtos { get; set; }
    public int? SurveyId { get; set; }
    public int? ArticleId { get; set; }
    public ArticleDTO? ArticleDto { get; set; }
    public ICollection<int> TripApplicationIds { get; set; }
}