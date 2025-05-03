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

export const TripTypeLabels: Record<TripType, string> = {
  [TripType.Classic]: 'Wyprawy classic',
  [TripType.Weekend]: 'Weekendowe wojaże',
  [TripType.Bike]: 'Wyprawy rowerowe',
};

export const DefaultArticleCategoryValue = ArticleCategory.Fotorelacje;
export const DefaultCountryValue = Country.Polska;

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

export const DefaultRatingValue = Rating.Good;

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
  TripApplicationDTOS: TripApplicationDTO | undefined;
  SurveyAnswerIds: number[] = [];
  SurveyAnswerDTOS: SurveyAnswerDTO[] = [];
}

export const DefaultStatusValue = Status.Created;

export class TripApplicationDTO {
  Id: number | undefined;
  Hash: string | undefined;
  Name: string = '';
  Email: string = '';
  PhoneNumber: string = '';
  ExtraInfo: string = '';
  Status: Status = DefaultStatusValue;
  TripId: number | undefined;
  TripDTO: TripDTO | undefined;
  SurveyResponseId: number | undefined;
  SurveyResponseDTO: SurveyResponseDTO | undefined;
}

export const DefaultTripTypeValue = TripType.Classic;

export class TripTermDTO {
  Id: number | undefined;
  Name: string = '';
  Price: number = 0;
  DateFrom: Date | null | undefined;
  DateTo: Date | null | undefined;
  ParticipantsCurrent: number = 0;
  ParticipantsTotal: number = 0;
  TripId: number | undefined;
  TripDTO: TripDTO | undefined;
}

export class TripDTO {
  Id: number | undefined;
  Name: string = '';
  TripTermIds: number[] = [];
  TripTermDTOS: TripTermDTO[] = [];
  Type: TripType = DefaultTripTypeValue;
  SurveyId: number | undefined;
  SurveyDTO: SurveyDTO | undefined;
  ArticleId: number | undefined;
  ArticleDTO: ArticleDTO | undefined;
  TripApplicationDTOS: TripApplicationDTO[] = [];
  TripApplicationIds: number[] = [];
}
