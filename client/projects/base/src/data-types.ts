export enum ArticleCategory {
  Photostories = 'Photostories',
  Tips = 'Tips',
  Recommendations = 'Recommendations',
  Trips = 'Trips',
}

export const ArticleCategoryLabels: Record<ArticleCategory, string> = {
  [ArticleCategory.Photostories]: 'Fotorelacje',
  [ArticleCategory.Tips]: 'Ciekawostki',
  [ArticleCategory.Recommendations]: 'Rekomendacje',
  [ArticleCategory.Trips]: 'Wyprawy',
};

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export const DifficultyLabels: Record<Difficulty, string> = {
  [Difficulty.Easy]: 'Łatwy',
  [Difficulty.Medium]: 'Średni',
  [Difficulty.Hard]: 'Trudny',
};

export enum Country {
  Poland = 'Poland',
  Norway = 'Norway',
  Japan = 'Japan',
  Portugal = 'Portugal',
  Cuba = 'Cuba',
}

export const CountryLabels: Record<Country, string> = {
  [Country.Poland]: 'Polska',
  [Country.Norway]: 'Norwegia',
  [Country.Japan]: 'Japonia',
  [Country.Portugal]: 'Portugalia',
  [Country.Cuba]: 'Kuba',
};

export enum Rating {
  Good = 'Good',
  Bad = 'Bad',
}

export enum SourceOfInformation {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Recommendation = 'Recommendation',
}

export const SourceOfInformationLabels: Record<SourceOfInformation, string> = {
  [SourceOfInformation.Facebook]: 'Facebook',
  [SourceOfInformation.Instagram]: 'Instagram',
  [SourceOfInformation.Recommendation]: 'Polecenie',
};

export enum Status {
  Created = 'Created',
  Sent = 'Sent',
  Completed = 'Completed',
  Approved = 'Approved',
  Rejected = 'Rejected',
  InProgress = 'InProgress',
}

export const StatusLabels: Record<Status, string> = {
  [Status.Created]: 'Utworzony',
  [Status.Sent]: 'Wysłany',
  [Status.Completed]: 'Uzupełniony',
  [Status.Approved]: 'Zatwierdzony',
  [Status.Rejected]: 'Odrzucony',
  [Status.InProgress]: 'W trakcie',
};

export enum TripType {
  Classic = 'Classic',
  Weekend = 'Weekend',
  Bike = 'Bike',
}

export const TripTypeLabels: Record<TripType, string> = {
  [TripType.Classic]: 'Wyprawy classic',
  [TripType.Weekend]: 'Weekendowe wojaże',
  [TripType.Bike]: 'Wyprawy rowerowe',
};

export const DefaultArticleCategoryValue = ArticleCategory.Photostories;
export const DefaultCountryValue = Country.Poland;
export const DefaultRatingValue = Rating.Good;
export const DefaultStatusValue = Status.Created;
export const DefaultTripTypeValue = TripType.Classic;
export const DefaultDifficultyValue = Difficulty.Medium;

export class ArticleDTO {
  Id: number | undefined;
  Title: string = '';
  Url: string = '';
  Content: string = '';
  BackgroundImageUrl: string = '';
  Country: Country = DefaultCountryValue;
  ArticleCategory = DefaultArticleCategoryValue;
  TripId: number | undefined;
  TripDTO: TripDTO | undefined;
}

export class OpinionDTO {
  Id: number | undefined;
  Token: string = '';
  Author: string = '';
  Content: string = '';
  Rate: Rating = DefaultRatingValue;
}

export class SurveyAnswerDTO {
  Id: number | undefined;
  Answer: string = '';
  SurveyQuestionId: number | undefined;
  SurveyQuestionDTO: SurveyQuestionDTO | undefined;
  SurveyResponseId: number | undefined;
  SurveyResponseDTO: SurveyResponseDTO | undefined;
}

export class SurveyDTO {
  Id: number | undefined;
  Title: string = '';
  ExtraLogoUrl: string | undefined;
  TripDTOS: TripDTO[] = [];
  TripIds: number[] = [];
  SurveyQuestionDTOS: SurveyQuestionDTO[] = [];
  SurveyQuestionIds: number[] = [];
}

export class SurveyQuestionDTO {
  Id: number | undefined;
  Question: string = '';
  IsCommon: boolean = false;
  SurveyIds: number[] = [];
  SurveyDTOS: SurveyDTO[] = [];
  SurveyAnswerIds: number[] = [];
  SurveyAnswerDTOS: SurveyAnswerDTO[] = [];
}

export class SurveyResponseDTO {
  Id: number | undefined;
  RepliedOn: Date = new Date();
  TripApplicationId: number | undefined;
  TripApplicationDTO: TripApplicationDTO | undefined;
  SurveyAnswerIds: number[] = [];
  SurveyAnswerDTOS: SurveyAnswerDTO[] = [];
}

export class TripApplicationDTO {
  Id: number | undefined;
  Hash: string | undefined;
  Name: string = '';
  Email: string = '';
  PhoneNumber: string = '';
  ExtraInfo: string = '';
  Status: Status = DefaultStatusValue;
  SourceOfInformation: SourceOfInformation | undefined;
  TripId: number | undefined;
  TripDTO: TripDTO | undefined;
  SurveyResponseId: number | undefined;
  SurveyResponseDTO: SurveyResponseDTO | undefined;
}

export class TripTermDTO {
  Id: number | undefined;
  Name: string = '';
  Price: number = 0;
  DateFrom: Date | null | undefined;
  DateTo: Date | null | undefined;
  ParticipantsCurrent: number = 0;
  ParticipantsTotal: number = 0;
  FreeSpots: number = 0;
  TripId: number | undefined;
  TripDTO: TripDTO | undefined;
}

export class TripDTO {
  Id: number | undefined;
  Name: string = '';
  TripTermIds: number[] = [];
  TripTermDTOS: TripTermDTO[] = [];
  Type: TripType = DefaultTripTypeValue;
  TripDifficulty: Difficulty = DefaultDifficultyValue;
  SurveyId: number | undefined;
  SurveyDTO: SurveyDTO | undefined;
  ArticleId: number | undefined;
  ArticleDTO: ArticleDTO | undefined;
  TripApplicationDTOS: TripApplicationDTO[] = [];
  TripApplicationIds: number[] = [];
}

export class AutosaveRequestDTO {
  TripApplicationId: number | undefined;
  Responses: Record<string, SurveyAnswerDTO> = {};
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  return DifficultyLabels[difficulty] ?? difficulty;
}

export function getStatusLabels(status: Status): string {
  return StatusLabels[status] ?? status;
}

export function getSourceOfInformationLabels(
  status: SourceOfInformation,
): string {
  return SourceOfInformationLabels[status] ?? status;
}

export function getCountryLabel(country: Country): string {
  return CountryLabels[country] ?? country;
}
