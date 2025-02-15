namespace sf.Models;

public class OpinionDTO
{
    public int? Id { get; set; }
    public string Token { get; set; }
    public string Author { get; set; }
    public string Content { get; set; }
    public Rating Rate { get; set; }
}