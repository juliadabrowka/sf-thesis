import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleStore } from '../../../state/article-store';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { ArticleDetailsInnerComponent } from '../article-details-inner/article-details-inner.component';

@Component({
  selector: 'sf-article-details',
  imports: [PageTitleFramedComponent, ArticleDetailsInnerComponent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore],
})
export class SfArticleDetailsComponent {
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);

  public readonly article = this.__articleStore.article;
  private readonly __articles = this.__articleStore.articles;
  private readonly __customLink = signal<string>('');

  constructor() {
    this.__activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const param = params.get('customLink') ?? '';
        this.__customLink.set(param);
      });

    effect(async () => {
      const link = this.__customLink();
      const articles = this.__articles();
      const article = articles.find((a) => a.Url === link);

      if (!article?.Id) {
        throw new Error('Article not found');
      }

      await this.__articleStore.loadArticleDetails(article.Id);
    });
  }
}
