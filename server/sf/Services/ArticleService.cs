using AutoMapper;
using sf.Models;
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
public class ArticleService(
    IArticleRepository articleRepository,
    IMapper mapper,
    ITripRepository tripRepository,
    ITripTermRepository tripTermRepository,
    ITripApplicationRepository applicationRepository)
    : IArticleService
{
    public async Task<ArticleDTO[]> GetArticles()
    {
        var articles = await articleRepository.GetArticles();
        return mapper.Map<ArticleDTO[]>(articles);
    }

    public async Task<ArticleDTO> GetArticleDetails(int articleId)
    {
        var articleDetails = await articleRepository.GetArticleDetails(articleId);
        return mapper.Map<ArticleDTO>(articleDetails);
    }

    public async Task DeleteArticles(int[] articleIds)
    {
        await articleRepository.DeleteArticles(articleIds);
    }

    public async Task<ArticleDTO> CreateArticle(ArticleDTO articleDto)
    {
        if (articleDto == null)
        {
            throw new ArgumentNullException(nameof(articleDto), "ArticleDTO cannot be null");
        }
        var articleEntity = mapper.Map<Article>(articleDto);
        var newArticle = await articleRepository.CreateArticle(articleEntity);
        
        if (newArticle.Trip != null)
        {
            newArticle.Trip.ArticleId = newArticle.Id;
            newArticle.Trip.Article = newArticle;
            await articleRepository.UpdateArticle(newArticle);
        }
        ArticleDTO article = mapper.Map<ArticleDTO>(newArticle);

        return article;
    }

    public async Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto)
    {
        if (!articleDto.Id.HasValue)
        {
            throw new ApplicationException("This article does not have an ID but should have.");
        }

        var article = await articleRepository.GetArticleDetails(articleDto.Id.Value);

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

        if (articleDto.TripDTO != null)
        {
            isUpdated = true;
            
            if (article.TripId != null) // if has id - only some data changes - has to be article bc dto cant be passed from ui
            { 
                var existingTrip = await tripRepository.GetTripDetails(article.TripId.Value);
                
                existingTrip.Name = articleDto.TripDTO.Name;
                existingTrip.Type = articleDto.TripDTO.Type;
                existingTrip.TripDifficulty = articleDto.TripDTO.TripDifficulty;
                
                foreach (var tripTermDto in articleDto.TripDTO.TripTermDTOS)
                {
                    if (tripTermDto.Id != null)
                    {
                        TripTerm existingTripTerm = await tripTermRepository.GetTripTermDetails(tripTermDto.Id.Value);

                        var updatedTripTerm = CompareTripTerms(existingTripTerm, tripTermDto);
                        if (updatedTripTerm != null)
                        {
                          await tripTermRepository.UpdateTripTerm(updatedTripTerm);  
                        }
                    }
                    else
                    {
                        var newTripTerm = mapper.Map<TripTerm>(tripTermDto);
                        existingTrip.TripTerms.Add(newTripTerm);
                        await tripRepository.UpdateTrip(existingTrip);
                    }
                }

                if (existingTrip.TripTerms.Select(t => t.Id)
                    .Any(tt => !articleDto.TripDTO.TripTermDTOS.Select(t => t.Id).Contains(tt)))
                {
                    var toRemoveIds = existingTrip.TripTerms
                        .Where(tt => !articleDto.TripDTO.TripTermDTOS.Select(t => t.Id).Contains(tt.Id))
                        .Select(tt => tt.Id)
                        .ToArray();
    
                    if (toRemoveIds.Any())
                    {
                        await tripTermRepository.DeleteTripTerms(toRemoveIds);
                    }
                }
                
                existingTrip.TripApplications = await applicationRepository.GetByIds(articleDto.TripDTO.TripApplicationIds);
                //existingTrip.Survey = articleDto.TripDto.

               

                article.Trip = existingTrip;
            }
            else // article trip id is null = not existing yet
            {
                Trip newTripEntity = mapper.Map<Trip>(articleDto.TripDTO);
                var newTrip = await tripRepository.CreateTrip(newTripEntity); // set id

                newTrip.Article = article;
                //newTrip.TripTerms = article.Trip != null ? article.Trip.TripTerms : new List<TripTerm>();
                var t = await tripRepository.UpdateTrip(newTrip);
                
                article.Trip = t;
                article.TripId = t.Id; 
            }
        }
        else if (article.Trip != null)
        {
            isUpdated = true;
            await tripRepository.DeleteTrips([article.Trip.Id]);
            article.TripId = null;
            article.Trip = null;
        }

        if (isUpdated)
        {
            await articleRepository.UpdateArticle(article);
        }

        return mapper.Map<ArticleDTO>(article);
    }

    private TripTerm? CompareTripTerms(TripTerm existingTripTerm, TripTermDTO tripTermDto)
    {
        bool isChanged = false;
        if (existingTripTerm.Name != tripTermDto.Name)
        {
            isChanged = true;
            existingTripTerm.Name = tripTermDto.Name;
        }

        if (existingTripTerm.Price != tripTermDto.Price)
        {
            isChanged = true;
            existingTripTerm.Price = tripTermDto.Price;
        }

        if (existingTripTerm.DateFrom != tripTermDto.DateFrom)
        {
            isChanged = true;
            existingTripTerm.DateFrom = tripTermDto.DateFrom;
        }

        if (existingTripTerm.DateTo != tripTermDto.DateTo)
        {
            isChanged = true;
            existingTripTerm.DateTo = tripTermDto.DateTo;
        }

        if (existingTripTerm.ParticipantsCurrent != tripTermDto.ParticipantsCurrent)
        {
            isChanged = true;
            existingTripTerm.ParticipantsCurrent = tripTermDto.ParticipantsCurrent;
        }

        if (existingTripTerm.ParticipantsTotal != tripTermDto.ParticipantsTotal)
        {
            isChanged = true;
            existingTripTerm.ParticipantsTotal = tripTermDto.ParticipantsTotal;
        }

        return isChanged ? existingTripTerm : null;
    }
}