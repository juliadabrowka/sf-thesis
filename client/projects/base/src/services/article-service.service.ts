import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleDTO } from '../data-types';
import { Observable } from 'rxjs';
import { environment } from 'projects/sf/src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getArticles() {
    return this.http.get<ArticleDTO[]>(
      this.apiUrl + '/articleList',
    ) as Observable<ArticleDTO[]>;
  }

  public getArticleDetails(articleId: number) {
    return this.http.get<ArticleDTO>(`${this.apiUrl}/article/${articleId}`);
  }

  public createArticle(articleDto: ArticleDTO) {
    return this.http.post<ArticleDTO>(
      this.apiUrl + '/createArticle',
      articleDto,
    ) as Observable<ArticleDTO>;
  }

  public updateArticle(articleDto: ArticleDTO) {
    return this.http.post(
      this.apiUrl + '/updateArticle',
      articleDto,
    ) as Observable<ArticleDTO>;
  }

  public deleteArticles(articleIds: number[]) {
    return this.http.post(this.apiUrl + `/deleteArticles`, articleIds);
  }
}
