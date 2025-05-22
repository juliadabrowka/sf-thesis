using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface IArticleRepository
    {
        Task<Article> CreateArticle(Article article);
        Task<Article[]> GetArticles();
        Task<Article> GetArticleDetails(int articleId);
        Task<Article> UpdateArticle(Article article);
        Task DeleteArticles(int[] articleId);
    }

public class ArticleRepository(SfDbContext sfDbContext) : IArticleRepository
{
    public async Task<Article> CreateArticle(Article article)
    {
        await sfDbContext.Articles.AddAsync(article);
        await sfDbContext.SaveChangesAsync();

        return article;
    }

    public async Task<Article[]> GetArticles()
    {
        var articles =  await sfDbContext.Articles
            .Include(a => a.Trip)
                .ThenInclude(t => t.TripTerms)
            .Include(a => a.Trip)
                .ThenInclude(t => t.TripApplications)
            .ToArrayAsync();

        return articles;
    }

    public async Task<Article> GetArticleDetails(int articleId)
    {
        var article = await sfDbContext.Articles
            .Include(a => a.Trip)
                .ThenInclude(t => t.TripTerms)
            .Include(a => a.Trip)
                .ThenInclude(t => t.TripApplications)
            .FirstOrDefaultAsync(a => a.Id == articleId);

        if (article == null)
        {
            throw new ApplicationException("Article not found");
        }

        return article;
    }

    public async Task<Article> UpdateArticle(Article article)
    {
        sfDbContext.Articles.Update(article);
        await sfDbContext.SaveChangesAsync();
        return article;
    }

    public async Task DeleteArticles(int[] articleIds)
    {
        var articles = await sfDbContext.Articles
            .Where(a => articleIds.Contains(a.Id))
            .ToListAsync(); 
        
        if (!articles.Any())
        {
            throw new AggregateException("No articles found to delete");
        }
        
        sfDbContext.Articles.RemoveRange(articles);
        await sfDbContext.SaveChangesAsync();
    }
    

}