export enum ArticleCategory {
  Fotorelacje = 'Fotorelacje',
  Ciekawostki = 'Ciekawostki',
  Rekomendacje = 'Rekomendacje',
  Wyprawy = 'Wyprawy',
}

export enum Country {
  Polska = 'Polska',
  Norwegia = 'Norwegia',
  Japonia = 'Japonia',
  Portugalia = 'Portugalia',
  Kuba = 'Kuba',
}

export enum Rating {
  Good = 'Good',
  Bad = 'Bad',
}

export enum Status {
  Created = 'Created',
  Sent = 'Sent',
  Received = 'Received',
  Completed = 'Completed',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Resigned = 'Resigned',
}

export enum TripType {
  Classic = 'Classic',
  Weekend = 'Weekend',
  Bike = 'Bike',
}

export const DefaultArticleCategoryValue = ArticleCategory.Fotorelacje;
export const DefaultCountryValue = Country.Polska;

export class ArticleDTO {
  Id: number | undefined;
  Title: string = '';
  Content: string = '';
  Country: Country = DefaultCountryValue;
  ArticleCategory = DefaultArticleCategoryValue;
  TripId: number | undefined;
  Trip: TripDTO | undefined;
}

export const DefaultRatingValue = Rating.Good

export class OpinionDTO {
  Id: number | undefined;
  Token: string = '';
  Author: string = '';
  Content: string = '';
  Rate: Rating = DefaultRatingValue;
}

export class SurveyAnswerDTO {
  Id: number | undefined
  Answer: string = '';
  SurveyQuestionId: number | undefined
  SurveyResponseId: number | undefined
}

export class SurveyDTO {
  Id: number | undefined;
  Title: string = '';
  Country: Country = DefaultCountryValue;
  TripId: number | undefined;
  SurveyQuestionIds: number[] = [];
}

export class SurveyQuestionDTO {
  Id: number | undefined;
  QuestionText: string = '';
  IsCommon: boolean = false;
  SurveyIds: number[] = [];
  SurveyAnswerIds: number[] = [];
}

export class SurveyResponseDTO {
  Id: number | undefined
  RepliedOn: Date = new Date();
  TripApplicationId: number | undefined
  SurveyAnswerIds: number[] = [];
}

export const DefaultStatusValue = Status.Created;

export class TripApplicationDTO {
  Id: number | undefined
  Name: string = '';
  Email: string = '';
  PhoneNumber: string = '';
  ExtraInfo: string = '';
  Status: Status = DefaultStatusValue;
  TripId: number | undefined
  SurveyResponseId: number | undefined
}

export const DefaultTripTypeValue = TripType.Classic

export class TripDTO {
  Id: number | undefined
  Price: number = 0;
  ParticipantsCurrent: number = 0;
  ParticipantsTotal: number = 0;
  Type: TripType = DefaultTripTypeValue;
  SurveyId: number | undefined
  ArticleId: number | undefined;
  Article: ArticleDTO = new ArticleDTO();
  TripApplicationIds: number[] = [];
}
