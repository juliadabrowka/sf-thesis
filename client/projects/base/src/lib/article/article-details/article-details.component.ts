import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuillViewComponent } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ArticleStore } from '../../../state/article/article.store';
import { filter, firstValueFrom, map } from 'rxjs';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { ArticleDetailsInnerComponent } from '../article-details-inner/article-details-inner.component';

@Component({
  selector: 'sf-article-details',
  imports: [
    QuillViewComponent,
    PageTitleFramedComponent,
    ArticleDetailsInnerComponent,
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore],
})
export class SfArticleDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly articleStore = inject(ArticleStore);

  public _article = this.articleStore.article;

  constructor() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        console.log('a');
        const param = params.get('customLink') ?? '';
        console.log(param);
        await this.loadArticleByUrl(param);
      });
  }

  private async loadArticleByUrl(customLink: string) {
    const a = await firstValueFrom(
      toObservable(this.articleStore.articles).pipe(
        filter((articles) => articles.length > 0),
        map((articles) => {
          const article = articles.find((a) => a.Url === customLink);
          if (!article) {
            throw new Error('Article not found');
          }
          return article;
        }),
      ),
    );
    await this.articleStore.loadArticleDetails(a.Id ?? 0);
  }
}
