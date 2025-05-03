
using Microsoft.EntityFrameworkCore;
using sf.Models;
using sf.Program.Data;

namespace sf.Repositories;

public interface ISurveyQuestionRepository
{
    Task<SurveyQuestion> CreateSurveyQuestion(SurveyQuestion surveyQuestion);
    Task<SurveyQuestion[]> GetSurveyQuestions();
    Task<SurveyQuestion> GetSurveyQuestionDetails(int surveyQuestionId);
    Task<SurveyQuestion> UpdateSurveyQuestion(SurveyQuestion surveyQuestion);
    Task DeleteSurveyQuestions(int[] surveyQuestionIds);
    Task<ICollection<SurveyQuestion>> GetSurveyQuestionsByIds(ICollection<int> surveySurveyQuestionIds);
}
public class SurveyQuestionRepository(SfDbContext sfDbContext) : ISurveyQuestionRepository
{
    public async Task<SurveyQuestion> CreateSurveyQuestion(SurveyQuestion surveyQuestion)
    {
        await sfDbContext.SurveyQuestions.AddAsync(surveyQuestion);
        await sfDbContext.SaveChangesAsync();

        return surveyQuestion;
    }

    public async Task<SurveyQuestion[]> GetSurveyQuestions()
    {
        return await sfDbContext.SurveyQuestions
            .Include(sq => sq.Surveys)
            .Include(sq => sq.SurveyAnswers)
            .ToArrayAsync();
    }

    public async Task<SurveyQuestion> GetSurveyQuestionDetails(int surveyQuestionId)
    {
        var sq = await sfDbContext.SurveyQuestions
            .Include(sq => sq.SurveyAnswers)
            .Include(sq => sq.Surveys)
            .FirstOrDefaultAsync(sq => sq.Id == surveyQuestionId);

        if (sq == null)
        {
            throw new ApplicationException("Survey question not found");
        }

        return sq;
    }

    public async Task<SurveyQuestion> UpdateSurveyQuestion(SurveyQuestion surveyQuestion)
    {
        sfDbContext.SurveyQuestions.Update(surveyQuestion);
        await sfDbContext.SaveChangesAsync();

        return surveyQuestion;
    }

    public async Task DeleteSurveyQuestions(int[] surveyQuestionIds)
    {
        var sq = await sfDbContext.SurveyQuestions
            .Where(sq => surveyQuestionIds.Contains(sq.Id))
            .ToListAsync();
        
        if (!sq.Any())
        {
            throw new ApplicationException("No  survey questions to delete found");
        }
        sfDbContext.SurveyQuestions.RemoveRange(sq);

        await sfDbContext.SaveChangesAsync();
    }

    public async Task<ICollection<SurveyQuestion>> GetSurveyQuestionsByIds(ICollection<int> surveySurveyQuestionIds)
    {
        return await sfDbContext.SurveyQuestions.Where(sq => surveySurveyQuestionIds.Contains(sq.Id)).ToListAsync();
    }
}