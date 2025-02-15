using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface IArticleRepository
    {
        Task<Article> CreateArticle(Article articleDto);
        Task<Article[]> GetArticles();
        Task<Article> GetArticleDetails(int articleId);
        Task<Article> UpdateArticle(Article article);
    }

public class ArticleRepository : IArticleRepository
{
    private readonly SfDbContext _sfDbContext;

    public ArticleRepository(SfDbContext sfDbContext)
    {
        _sfDbContext = sfDbContext;
    }
    
    public async Task<Article> CreateArticle(Article article)
    {
        await _sfDbContext.Articles.AddAsync(article);
        await _sfDbContext.SaveChangesAsync();

        return article;
    }

    public async Task<Article[]> GetArticles()
    {
        return await _sfDbContext.Articles
            .Include(p => p.Trip)
            .ToArrayAsync();
    }

    public async Task<Article> GetArticleDetails(int articleId)
    {
        var p = await _sfDbContext.Articles
            .Include(p => p.Trip)
            .FirstOrDefaultAsync(p => p.Id == articleId);

        if (p == null)
        {
            throw new ApplicationException("Post not found");
        }

        return p;
    }

    public async Task<Article> UpdateArticle(Article article)
    {
        _sfDbContext.Articles.Update(article);
        await _sfDbContext.SaveChangesAsync();
        return article;
    }
}