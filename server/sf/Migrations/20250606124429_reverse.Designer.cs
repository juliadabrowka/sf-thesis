﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using sf.Program.Data;

#nullable disable

namespace sf.Migrations
{
    [DbContext(typeof(SfDbContext))]
    [Migration("20250606124429_reverse")]
    partial class reverse
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SurveySurveyQuestion", b =>
                {
                    b.Property<int>("SurveyQuestionsId")
                        .HasColumnType("int");

                    b.Property<int>("SurveysId")
                        .HasColumnType("int");

                    b.HasKey("SurveyQuestionsId", "SurveysId");

                    b.HasIndex("SurveysId");

                    b.ToTable("SurveySurveyQuestion", (string)null);
                });

            modelBuilder.Entity("sf.Models.Article", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ArticleCategory")
                        .HasColumnType("int");

                    b.Property<string>("BackgroundImageUrl")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Country")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<int?>("TripId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.HasKey("Id");

                    b.HasIndex("TripId")
                        .IsUnique()
                        .HasFilter("[TripId] IS NOT NULL");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("sf.Models.Survey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Country")
                        .HasColumnType("int");

                    b.Property<string>("ExtraLogoUrl")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("sf.Models.SurveyAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SurveyQuestionId")
                        .HasColumnType("int");

                    b.Property<int?>("SurveyResponseId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SurveyQuestionId");

                    b.HasIndex("SurveyResponseId");

                    b.ToTable("SurveyAnswers");
                });

            modelBuilder.Entity("sf.Models.SurveyQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsCommon")
                        .HasColumnType("bit");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("nvarchar(2000)");

                    b.HasKey("Id");

                    b.ToTable("SurveyQuestions");
                });

            modelBuilder.Entity("sf.Models.SurveyResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("RepliedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("TripApplicationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TripApplicationId")
                        .IsUnique();

                    b.ToTable("SurveyResponses");
                });

            modelBuilder.Entity("sf.Models.Trip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ArticleId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SurveyId")
                        .HasColumnType("int");

                    b.Property<int>("TripDifficulty")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SurveyId");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("sf.Models.TripApplication", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AppliedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ExtraInfo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Hash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SourceOfInformation")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("SurveyResponseId")
                        .HasColumnType("int");

                    b.Property<int>("TripId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("TripApplications");
                });

            modelBuilder.Entity("sf.Models.TripTerm", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateFrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTo")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParticipantsCurrent")
                        .HasColumnType("int");

                    b.Property<int>("ParticipantsTotal")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.Property<int?>("TripId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("TripTerms");
                });

            modelBuilder.Entity("sf.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SurveySurveyQuestion", b =>
                {
                    b.HasOne("sf.Models.SurveyQuestion", null)
                        .WithMany()
                        .HasForeignKey("SurveyQuestionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("sf.Models.Survey", null)
                        .WithMany()
                        .HasForeignKey("SurveysId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("sf.Models.Article", b =>
                {
                    b.HasOne("sf.Models.Trip", "Trip")
                        .WithOne("Article")
                        .HasForeignKey("sf.Models.Article", "TripId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Trip");
                });

            modelBuilder.Entity("sf.Models.SurveyAnswer", b =>
                {
                    b.HasOne("sf.Models.SurveyQuestion", "SurveyQuestion")
                        .WithMany("SurveyAnswers")
                        .HasForeignKey("SurveyQuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("sf.Models.SurveyResponse", "SurveyResponse")
                        .WithMany("SurveyAnswers")
                        .HasForeignKey("SurveyResponseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("SurveyQuestion");

                    b.Navigation("SurveyResponse");
                });

            modelBuilder.Entity("sf.Models.SurveyResponse", b =>
                {
                    b.HasOne("sf.Models.TripApplication", "TripApplication")
                        .WithOne("SurveyResponse")
                        .HasForeignKey("sf.Models.SurveyResponse", "TripApplicationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("TripApplication");
                });

            modelBuilder.Entity("sf.Models.Trip", b =>
                {
                    b.HasOne("sf.Models.Survey", "Survey")
                        .WithMany("Trips")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("sf.Models.TripApplication", b =>
                {
                    b.HasOne("sf.Models.Trip", "Trip")
                        .WithMany("TripApplications")
                        .HasForeignKey("TripId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Trip");
                });

            modelBuilder.Entity("sf.Models.TripTerm", b =>
                {
                    b.HasOne("sf.Models.Trip", "Trip")
                        .WithMany("TripTerms")
                        .HasForeignKey("TripId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Trip");
                });

            modelBuilder.Entity("sf.Models.Survey", b =>
                {
                    b.Navigation("Trips");
                });

            modelBuilder.Entity("sf.Models.SurveyQuestion", b =>
                {
                    b.Navigation("SurveyAnswers");
                });

            modelBuilder.Entity("sf.Models.SurveyResponse", b =>
                {
                    b.Navigation("SurveyAnswers");
                });

            modelBuilder.Entity("sf.Models.Trip", b =>
                {
                    b.Navigation("Article");

                    b.Navigation("TripApplications");

                    b.Navigation("TripTerms");
                });

            modelBuilder.Entity("sf.Models.TripApplication", b =>
                {
                    b.Navigation("SurveyResponse");
                });
#pragma warning restore 612, 618
        }
    }
}
