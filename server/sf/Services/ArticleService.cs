using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;
using sf.Repositories;
using ApplicationException = System.ApplicationException;

namespace sf.Services;


public interface IArticleService
{
    Task<ArticleDTO> CreateArticle(ArticleDTO articleDto);
    Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto);
    Task<ArticleDTO[]> GetArticles();
    Task<ArticleDTO> GetArticleDetails(int articleId);
    Task DeleteArticles(int[] articleIds);
}
public class ArticleService : IArticleService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IMapper _mapper;
    private readonly ITripRepository _tripRepository;
    private readonly ITripApplicationRepository _applicationRepository;

    public ArticleService(IArticleRepository articleRepository, IMapper mapper, ITripRepository tripRepository, ITripApplicationRepository applicationRepository)
    {
        _articleRepository = articleRepository;
        _mapper = mapper;
        _tripRepository = tripRepository;
        _applicationRepository = applicationRepository;
    }
    
    public async Task<ArticleDTO[]> GetArticles()
    {
        var articles = await _articleRepository.GetArticles();
        return _mapper.Map<ArticleDTO[]>(articles);
    }

    public async Task<ArticleDTO> GetArticleDetails(int articleId)
    {
        var articleDetails = await _articleRepository.GetArticleDetails(articleId);
        return _mapper.Map<ArticleDTO>(articleDetails);
    }

    public async Task DeleteArticles(int[] articleIds)
    {
        await _articleRepository.DeleteArticles(articleIds);
    }

    public async Task<ArticleDTO> CreateArticle(ArticleDTO articleDto)
    {
        if (articleDto == null)
        {
            throw new ArgumentNullException(nameof(articleDto), "ArticleDTO cannot be null");
        }
        var articleEntity = _mapper.Map<Article>(articleDto);

        
        if (articleDto.TripDto != null)
        {
            var t = articleDto.TripDto;
            var tripEntity = _mapper.Map<Trip>(t);
            await _tripRepository.CreateTrip(tripEntity);
        }
        var newArticle = await _articleRepository.CreateArticle(articleEntity);
        
        if (articleDto.ArticleCategory == ArticleCategory.Wyprawy)
        {
            if (articleDto.TripDto == null)
            {
                throw new ApplicationException("Trip given in the article is null but should not be");
            }

            if (newArticle.Trip == null)
            {
                throw new ApplicationException("Trip in article is null but should not be");
            }
            
            newArticle.TripId = newArticle.Trip.Id;
            await _articleRepository.UpdateArticle(newArticle);
        }

        return _mapper.Map<ArticleDTO>(newArticle);
    }

    public async Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto)
    {
        if (!articleDto.Id.HasValue)
        {
            throw new ApplicationException("This article does not have an ID but should have.");
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

        if (article.Url != articleDto.Url)
        {
            article.Url = articleDto.Url;
            isUpdated = true;
        }

        if (article.BackgroundImageUrl != articleDto.BackgroundImageUrl)
        {
            article.BackgroundImageUrl = articleDto.BackgroundImageUrl;
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

        if (articleDto.TripDto != null)
        {
            isUpdated = true;
            
            if (article.TripId != null) // if has id - only some data changes - has to be article bc dto cant be passed from ui
            { 
                var existingTrip = await _tripRepository.GetTripDetails(article.TripId.Value);
                
                
                existingTrip.Name = articleDto.TripDto.Name;
                existingTrip.Type = articleDto.TripDto.Type;

                var ttd = _mapper.Map<ICollection<TripTerm>>(articleDto.TripDto.TripTermDtos);
                existingTrip.TripTerms = ttd;
                
                existingTrip.TripApplications = await _applicationRepository.GetByIds(articleDto.TripDto.TripApplicationIds);
                //existingTrip.Survey = articleDto.TripDto.SurveyId; get from survey server
            
                await _tripRepository.UpdateTrip(existingTrip);

                article.Trip = existingTrip;
            }
            else // article trip id is null = not existing yet
            {
                Trip newTripEntity = _mapper.Map<Trip>(articleDto.TripDto);
                var newTrip = await _tripRepository.CreateTrip(newTripEntity); // set id

                newTrip.ArticleId = article.Id;
                //newTrip.TripTerms = article.Trip != null ? article.Trip.TripTerms : new List<TripTerm>();
                var t = await _tripRepository.UpdateTrip(newTrip);
                
                article.Trip = t;
                article.TripId = t.Id; 
            }
        }
        else if (article.Trip != null)
        {
            isUpdated = true;
            await _tripRepository.DeleteTrips([article.Trip.Id]);
            article.TripId = null;
            article.Trip = null;
        }

        if (isUpdated)
        {
            await _articleRepository.UpdateArticle(article);
        }

        return _mapper.Map<ArticleDTO>(article);
    }
}