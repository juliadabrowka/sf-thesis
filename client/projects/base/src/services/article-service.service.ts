import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ArticleDTO} from '../data-types';
import {Observable} from 'rxjs';
import {environment} from 'projects/sf/src/app/environments/environment';

@Injectable({providedIn: 'root'})
export class ArticleService {
  private readonly apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
    }

  public async getArticles() {
      return this.http.get<ArticleDTO[]>(this.apiUrl + '/articleList') as Observable<ArticleDTO[]>;
  }

  public async getArticleDetails(articleId: number) {
    return this.http.get<ArticleDTO>(`${this.apiUrl}/articles/${articleId}`);
  }

  public async createArticle(articleDto: ArticleDTO) {
      return this.http.post<ArticleDTO>(this.apiUrl + '/createArticle', articleDto) as Observable<ArticleDTO>;
  }

  public async updateArticle(articleDto: ArticleDTO) {
      return this.http.post(this.apiUrl + '/updateArticle', articleDto) as Observable<ArticleDTO>;
    }

  public async deleteArticles(ids: number[]) {
      return this.http.delete(this.apiUrl + `/deleteArticles`, {body: {ids}}) as unknown as Observable<void>
  }
}

