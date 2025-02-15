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
        var posts = await _articleService.GetArticles();
        return Ok(posts);
    }

    [HttpPost("createArticle")]
    public async Task<ActionResult<ArticleDTO>> CreateArticle([FromBody] ArticleDTO articleDto)
    {
        ArticleDTO[] posts = await _articleService.GetArticles();
        bool postAlreadyExists = posts.Any(p => p.Id == articleDto.Id);

        if (postAlreadyExists)
        {
            throw new ApplicationException("PostDTO already exists");
        }

        var post = await _articleService.CreateArticle(articleDto);
        return Ok(post);
    }

    [HttpPost("updateArticle")]
    public async Task<ActionResult<ArticleDTO>> UpdateArticle(ArticleDTO articleDto)
    {
        var article = await _articleService.UpdateArticle(articleDto);
        return Ok(article);
    }

    [HttpGet("articles/{articleId}")]
    public async Task<ActionResult<ArticleDTO>> ArticleDetails(int articleId)
    {
        var post = await _articleService.GetArticleDetails(articleId);
        return Ok(post);
    }
}