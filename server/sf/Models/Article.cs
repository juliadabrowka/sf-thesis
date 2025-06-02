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
    [Required]
    [MaxLength(250)]
    public string Title { get; set;}
    [Required]
    [MaxLength(300)]
    public string Url { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    [MaxLength(500)]
    public string BackgroundImageUrl { get; set; }
    [Required]
    [JsonConverter(typeof(StringEnumConverter))]
    public Country Country { get; set; }
    [Required]
    [JsonConverter(typeof(StringEnumConverter))]
    public ArticleCategory ArticleCategory { get; set; }
    
    public int? TripId { get; set; }
    public Trip? Trip { get; set; }
}