using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class ArticleController(IArticleService articleService) : ControllerBase
{
    [HttpGet("articleList")]
    public async Task<ActionResult<ArticleDTO[]>> ArticleList()
    {
        var articles = await articleService.GetArticles();
        return Ok(articles);
    }

    [HttpPost("createArticle")]
    public async Task<ActionResult<ArticleDTO>> CreateArticle([FromBody] ArticleDTO articleDto)
    {
        if (articleDto.Id.HasValue)
        {
            ArticleDTO existingArticle = await articleService.GetArticleDetails(articleDto.Id.Value);
            if (existingArticle != null)
            {
                throw new ApplicationException("ArticleDTO with given ID already exists");
            }
        }

        var article = await articleService.CreateArticle(articleDto);
        return Ok(article);
    }

    [HttpPost("updateArticle")]
    public async Task<ActionResult<ArticleDTO>> UpdateArticle(ArticleDTO articleDto)
    {
        var article = await articleService.UpdateArticle(articleDto);
        return Ok(article);
    }

    [HttpGet("article/{articleId}")]
    public async Task<ActionResult<ArticleDTO>> ArticleDetails(int articleId)
    {
        var article = await articleService.GetArticleDetails(articleId);
        return Ok(article);
    }

    [HttpPost("deleteArticles")]
    public async Task<ActionResult> DeleteArticles([FromBody] int[] articleIds)
    {
        await articleService.DeleteArticles(articleIds);
        return Ok();
    }
}