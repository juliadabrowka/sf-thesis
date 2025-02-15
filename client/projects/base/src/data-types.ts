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
  Id: number = 0;
  Title: string = '';
  Content: string = '';
  Country: Country = DefaultCountryValue;
  ArticleCategory = DefaultArticleCategoryValue;
  TripId: number = 0;
}

export const DefaultRatingValue = Rating.Good

export class OpinionDTO {
  Id: number = 0;
  Token: string = '';
  Author: string = '';
  Content: string = '';
  Rate: Rating = DefaultRatingValue;
}

export class SurveyAnswerDTO {
  Id: number = 0;
  Answer: string = '';
  SurveyQuestionId: number = 0;
  SurveyResponseId: number = 0;
}

export class SurveyDTO {
  Id: number = 0;
  Title: string = '';
  Country: Country = DefaultCountryValue;
  TripId: number = 0;
  SurveyQuestionIds: number[] = [];
}

export class SurveyQuestionDTO {
  Id: number = 0;
  QuestionText: string = '';
  IsCommon: boolean = false;
  SurveyIds: number[] = [];
  SurveyAnswerIds: number[] = [];
}

export class SurveyResponseDTO {
  Id: number = 0;
  RepliedOn: Date = new Date();
  TripApplicationId: number = 0;
  SurveyAnswerIds: number[] = [];
}

export const DefaultStatusValue = Status.Created;

export class TripApplicationDTO {
  Id: number = 0;
  Name: string = '';
  Email: string = '';
  PhoneNumber: string = '';
  ExtraInfo: string = '';
  Status: Status = DefaultStatusValue;
  TripId: number = 0;
  SurveyResponseId: number = 0;
}

export const DefaultTripTypeValue = TripType.Classic

export class TripDTO {
  Id: number = 0;
  Name: string = '';
  Country: Country = DefaultCountryValue;
  DateFrom: Date = new Date();
  DateTo: Date = new Date();
  Price: number = 0;
  ParticipantsCurrent: number = 0;
  ParticipantsTotal: number = 0;
  Type: TripType = DefaultTripTypeValue;
  SurveyId: number = 0;
  PostIds: number[] = [];
  TripApplicationIds: number[] = [];
}
