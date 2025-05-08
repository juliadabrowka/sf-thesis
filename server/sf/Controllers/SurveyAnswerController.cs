using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Repositories;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class SurveyAnswerController(ISurveyAnswerService surveyAnswerService) : ControllerBase
{
    [HttpGet("surveyAnswerList")]
    public async Task<ActionResult<SurveyAnswerDTO[]>> SurveyAnswerList()
    {
        var surveys = await surveyAnswerService.GetSurveyAnswers();
        return Ok(surveys);
    }
}