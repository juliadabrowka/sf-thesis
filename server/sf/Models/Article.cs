using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace sf.Models;

public class Article
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set;}
    public string Content { get; set; }
    
    [JsonConverter(typeof(StringEnumConverter))]
    public Country Country { get; set; }
    
    [JsonConverter(typeof(StringEnumConverter))]
    public ArticleCategory ArticleCategory { get; set; }
    
    public int? TripId { get; set; }
    public Trip? Trip { get; set; }
}