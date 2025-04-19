using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class SurveyController(ISurveyService surveyService): ControllerBase
{
   [HttpGet("surveyList")]
   public async Task<ActionResult<SurveyDTO[]>> SurveyList()
   {
      var surveys = await surveyService.GetSurveys();
      return Ok(surveys);
   }

   [HttpPost("createSurvey")]
   public async Task<ActionResult<SurveyDTO>> CreateSurvey([FromBody] SurveyDTO surveyDto)
   {
      if (surveyDto.Id.HasValue)
      {
         SurveyDTO existingSurvey = await surveyService.GetSurveyDetails(surveyDto.Id.Value);
         if (existingSurvey != null)
         {
            throw new ApplicationException("SurveyDTO with given ID already exists");
         }
      } 
      var survey = await surveyService.CreateSurvey(surveyDto);
      return Ok(survey);
   }
}