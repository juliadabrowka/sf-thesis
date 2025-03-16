using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

    public ArticleService(IArticleRepository articleRepository, IMapper mapper, ITripRepository tripRepository)
    {
        _articleRepository = articleRepository;
        _mapper = mapper;
        _tripRepository = tripRepository;
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
        var article = await _articleRepository.CreateArticle(articleEntity);
         if (article == null)
         {
             throw new ApplicationException("Article is null but should not be");
         }
        if (article.ArticleCategory == ArticleCategory.Wyprawy)
        {
            if (articleDto.TripDto == null)
            {
                throw new ApplicationException("Trip given in the article is null but should bot be");
            }

            var t = _mapper.Map<Trip>(articleDto.TripDto);

            var trip = await _tripRepository.CreateTrip(t);
            article.Trip = trip;
            article.TripId = trip.Id;
           
            trip.Article = article;
            trip.ArticleId = article.Id;

            await _articleRepository.UpdateArticle(article);
            await _tripRepository.UpdateTrip(trip);
        }
        
        return _mapper.Map<ArticleDTO>(article);
    }

    public async Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto)
    {
        if (articleDto.Id == null)
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

        if (articleDto.TripId != article.TripId) // changes category from/to trip
        {
            isUpdated = true;
            if (articleDto.TripId == null) // new trip is null - category changes
            {
                article.Trip = null;
                article.TripId = null;
            }
            else // new trip is not null - data inside of it changes
            {
                var currentTrip =
                    await _tripRepository.GetTripDetails(articleDto.TripId.Value); // current trip data from DB

                if (currentTrip == null)
                {
                    throw new ApplicationException(
                        $"Trip with ID {articleDto.TripId.Value} not found when updating article.");
                }

                article.Trip = currentTrip;
                article.TripId = currentTrip.Id;
            }
        }
        
        // updates details in the same trip article
        else if (articleDto.TripId != null)
        {
            isUpdated = true;
            var currentTrip = article.Trip;
            var updatedTrip = _mapper.Map<Trip>(articleDto.TripDto); // maps to new updated trip

            if (updatedTrip == null)
            {
                throw new ApplicationException(
                    $"Trip with ID {articleDto.TripId.Value} not found when updating article.");
            }

            if (!TripsAreEqual(currentTrip, updatedTrip))
            {
                isUpdated = true;
                article.Trip = updatedTrip;
                article.TripId = updatedTrip.Id;
            }
        }

        if (isUpdated)
        {
            await _articleRepository.UpdateArticle(article);
        }

        return _mapper.Map<ArticleDTO>(article);
    }

    private bool TripsAreEqual(Trip currentTrip, Trip updatedTrip)
    {
        var currentTripApplications = new HashSet<int>(currentTrip.TripApplications.Select(t => t.Id));
        var updatedTripApplications = new HashSet<int>(updatedTrip.TripApplications.Select(t => t.Id));

        return currentTrip.Price == updatedTrip.Price &&
               currentTrip.Type == updatedTrip.Type &&
               currentTrip.ArticleId == updatedTrip.ArticleId &&
               currentTrip.DateFrom == updatedTrip.DateFrom &&
               currentTrip.DateTo == updatedTrip.DateTo &&
               currentTrip.SurveyId == updatedTrip.SurveyId &&
               currentTrip.ParticipantsCurrent == updatedTrip.ParticipantsCurrent &&
               currentTrip.ParticipantsTotal == updatedTrip.ParticipantsTotal &&
               currentTripApplications == updatedTripApplications;
    }
}