using Microsoft.AspNetCore.Mvc;
using sf.Models;
using sf.Services;

namespace sf.Controllers;

[ApiController]
[Route("api/")]
public class ArticleController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticleController(IArticleService articleService)
    {
        _articleService = articleService;
    }
    
    [HttpGet("articleList")]
    public async Task<ActionResult<ArticleDTO[]>> ArticleList()
    {
        var articles = await _articleService.GetArticles();
        return Ok(articles);
    }

    [HttpPost("createArticle")]
    public async Task<ActionResult<ArticleDTO>> CreateArticle([FromBody] ArticleDTO articleDto)
    {
        if (articleDto.Id.HasValue)
        {
            ArticleDTO existingArticle = await _articleService.GetArticleDetails(articleDto.Id.Value);
            if (existingArticle != null)
            {
                throw new ApplicationException("ArticleDTO with given ID already exists");
            }
        }

        var article = await _articleService.CreateArticle(articleDto);
        return Ok(article);
    }

    [HttpPost("updateArticle")]
    public async Task<ActionResult<ArticleDTO>> UpdateArticle(ArticleDTO articleDto)
    {
        var article = await _articleService.UpdateArticle(articleDto);
        return Ok(article);
    }

    [HttpGet("article/{articleId}")]
    public async Task<ActionResult<ArticleDTO>> ArticleDetails(int articleId)
    {
        var article = await _articleService.GetArticleDetails(articleId);
        return Ok(article);
    }

    [HttpPost("deleteArticles")]
    public async Task<ActionResult> DeleteArticles([FromBody] int[] articleIds)
    {
        await _articleService.DeleteArticles(articleIds);
        return Ok();
    }
}