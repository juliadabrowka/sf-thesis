using Microsoft.EntityFrameworkCore;
using sf.Models;

namespace sf.Program.Data;

public class SfDbContext(DbContextOptions<SfDbContext> options) : DbContext(options)
{
    public DbSet<Opinion> Opinions { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<Survey> Surveys { get; set; }
    public DbSet<SurveyQuestion> SurveyQuestions { get; set; }
    public DbSet<SurveyResponse> SurveyResponses { get; set; }
    public DbSet<Trip> Trips { get; set; }
    public DbSet<TripTerm> TripTerms { get; set; }
    public DbSet<TripApplication> TripApplications { get; set; }
    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // survey - trip
        modelBuilder.Entity<Survey>()
            .HasMany(s => s.Trips)
            .WithOne(t => t.Survey)
            .HasForeignKey(s => s.SurveyId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // survey - survey question
        modelBuilder.Entity<Survey>()
            .HasMany<SurveyQuestion>(s => s.SurveyQuestions)
            .WithMany(sq => sq.Surveys)
            .UsingEntity(j => j.ToTable("SurveySurveyQuestion"));
        
        // survey response - trip application
        modelBuilder.Entity<SurveyResponse>()
            .HasOne<TripApplication>(sr => sr.TripApplication)
            .WithOne(o => o.SurveyResponse)
            .HasForeignKey<SurveyResponse>(sr => sr.TripApplicationId)
            .OnDelete(DeleteBehavior.Restrict);

        // survey response - survey answer
        modelBuilder.Entity<SurveyResponse>()
            .HasMany<SurveyAnswer>(sr => sr.SurveyAnswers)
            .WithOne(sa => sa.SurveyResponse)
            .HasForeignKey(o => o.SurveyResponseId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // survey answer - survey question 
        modelBuilder.Entity<SurveyQuestion>()
            .HasMany(sq => sq.SurveyAnswers)
            .WithOne(sa => sa.SurveyQuestion)
            .HasForeignKey(sa => sa.SurveyQuestionId)
            .OnDelete(DeleteBehavior.Cascade); 
        
        // trip - article
        modelBuilder.Entity<Trip>()
            .HasOne(t => t.Article)
            .WithOne(a => a.Trip)
            .HasForeignKey<Article>(a => a.TripId)
            .OnDelete(DeleteBehavior.Cascade); 

        // trip - trip application
        modelBuilder.Entity<Trip>()
            .HasMany<TripApplication>(t => t.TripApplications)
            .WithOne(ta => ta.Trip)
            .HasForeignKey(o => o.TripId)
            .OnDelete(DeleteBehavior.Cascade); 
        
        // trip - trip term
        modelBuilder.Entity<Trip>()
            .HasMany<TripTerm>(t => t.TripTerms)
            .WithOne(tt => tt.Trip)
            .HasForeignKey(tt => tt.TripId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}