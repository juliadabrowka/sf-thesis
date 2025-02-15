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
        var postEntity = _mapper.Map<Article>(articleDto);
        var createdPost = await _articleRepository.CreateArticle(postEntity);

        return _mapper.Map<ArticleDTO>(createdPost);
    }

    public async Task<ArticleDTO> UpdateArticle(ArticleDTO articleDto)
    {
        if (articleDto.Id == null)
        {
            throw new ApplicationException("This post does not have id but should have");
        }

        var p = await _articleRepository.GetArticleDetails(articleDto.Id.Value);
        
        await _articleRepository.UpdateArticle(p);
        return _mapper.Map<ArticleDTO>(p);
    }
}