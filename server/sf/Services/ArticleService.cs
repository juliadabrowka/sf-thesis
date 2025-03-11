using AutoMapper;
using sf.Models;
using sf.Repositories;

namespace sf.Services;


public interface IArticleService
{
    Task<ArticleDTO> CreateArticle(ArticleDTO articleDto);
    Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto);
    Task<ArticleDTO[]> GetArticles();
    Task<ArticleDTO> GetArticleDetails(int articleId);
}
public class ArticleService : IArticleService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IMapper _mapper;
    private readonly ITripRepository _tripRepository;

    public ArticleService(IArticleRepository articleRepository, IMapper mapper)
    {
        _articleRepository = articleRepository;
        _mapper = mapper;
    }
    
    public async Task<ArticleDTO[]> GetArticles()
    {
        var posts = await _articleRepository.GetArticles();
        return _mapper.Map<ArticleDTO[]>(posts);
    }

    public async Task<ArticleDTO> GetArticleDetails(int articleId)
    {
        var post = await _articleRepository.GetArticleDetails(articleId);
        return _mapper.Map<ArticleDTO>(post);
    }

    public async Task<ArticleDTO> CreateArticle(ArticleDTO articleDto)
    {
        if (articleDto.TripId.HasValue)
        {
            var trip = await _tripRepository.GetTripDetails(articleDto.TripId.Value);
            if (trip == null)
            {
                throw new ApplicationException($"Trip with ID {articleDto.TripId} not found.");
            }
        }
        
        var postEntity = _mapper.Map<Article>(articleDto);
        var createdPost = await _articleRepository.CreateArticle(postEntity);

        return _mapper.Map<ArticleDTO>(createdPost);
    }

    public async Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto)
    {
        if (articleDto.Id == null)
        {
            throw new ApplicationException("This post does not have an ID but should have.");
        }

        var article = await _articleRepository.GetArticleDetails(articleDto.Id.Value);

        if (article == null)
        {
            throw new ApplicationException($"Article with ID {articleDto.Id.Value} not found.");
        }

        bool isUpdated = false;

        if (article.Title != articleDto.Title)
        {
            article.Title = articleDto.Title;
            isUpdated = true;
        }

        if (article.ArticleCategory != articleDto.ArticleCategory)
        {
            article.ArticleCategory = articleDto.ArticleCategory;
            isUpdated = true;
        }

        if (article.Content != articleDto.Content)
        {
            article.Content = articleDto.Content;
            isUpdated = true;
        }

        if (article.Country != articleDto.Country)
        {
            article.Country = articleDto.Country;
            isUpdated = true;
        }

        if (article.TripId != articleDto.TripId)
        {
            if (articleDto.TripId.HasValue)
            { 
                var newTrip = await _tripRepository.GetTripDetails(articleDto.TripId.Value);
                if (newTrip == null)
                {
                    throw new ApplicationException($"Trip with ID {articleDto.TripId.Value} not found.");
                }

                article.TripId = articleDto.TripId.Value;
                article.Trip = newTrip;
            }
            else
            {
                article.TripId = null;
                article.Trip = null;
            }
        }

        if (isUpdated)
        {
            await _articleRepository.UpdateArticle(article);
        }

        return _mapper.Map<ArticleDTO>(article);
    }

}