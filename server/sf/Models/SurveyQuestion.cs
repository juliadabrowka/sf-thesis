using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sf.Models;

public class SurveyQuestion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string Question { get; set; }
    public bool IsCommon { get; set; }

    public ICollection<Survey> Surveys = new List<Survey>();
    public ICollection<SurveyAnswer> SurveyAnswers = new List<SurveyAnswer>();
}