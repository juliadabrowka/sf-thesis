using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;
using sf.Services;

namespace sf.Repositories;

public interface IArticleRepository
    {
        Task<Article> CreateArticle(Article articleDto);
        Task<Article[]> GetArticles();
        Task<Article> GetArticleDetails(int articleId);
        Task<Article> UpdateArticle(Article article);
        Task DeleteArticles(int[] articleId);
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
            .Include(a => a.Trip)
            .ToArrayAsync();
    }

    public async Task<Article> GetArticleDetails(int articleId)
    {
        var p = await _sfDbContext.Articles
            .Include(a => a.Trip)
            .FirstOrDefaultAsync(a => a.Id == articleId);

        if (p == null)
        {
            throw new ApplicationException("Article not found");
        }

        return p;
    }

    public async Task<Article> UpdateArticle(Article article)
    {
        _sfDbContext.Articles.Update(article);
        await _sfDbContext.SaveChangesAsync();
        return article;
    }

    public async Task DeleteArticles(int[] articleIds)
    {
        var articles = await _sfDbContext.Articles
            .Where(a => articleIds.Contains(a.Id))
            .ToListAsync(); 
        
        if (!articles.Any())
        {
            throw new AggregateException("No articles found to delete");
        }
        
        _sfDbContext.Articles.RemoveRange(articles);
        await _sfDbContext.SaveChangesAsync();
    }
}