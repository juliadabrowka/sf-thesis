import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleStore } from '../../../state/article-store';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { ArticleDetailsInnerComponent } from '../article-details-inner/article-details-inner.component';
import { SfSkeletonComponent } from '../../skeleton/skeleton.component';

@Component({
  selector: 'sf-article-details',
  imports: [
    PageTitleFramedComponent,
    ArticleDetailsInnerComponent,
    SfSkeletonComponent,
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleDetailsComponent {
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);

  public readonly article = computed(() => this.__articleStore.article());
  public readonly loading = computed(() => this.__articleStore.loading());

  private readonly __articles = computed(() => this.__articleStore.articles());
  private readonly __customLink = signal<string | undefined>(undefined);

  constructor() {
    this.__activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const param = params.get('customLink');
        if (param) this.__customLink.set(param);
      });

    effect(async () => {
      if (this.__customLink()) {
        const link = this.__customLink();
        const articles = this.__articles();
        if (articles) {
          const article = articles.find((a) => a.Url === link);

          if (!article?.Id) {
            return;
          }

          await this.__articleStore.getArticleDetails(article.Id);
        }
      }
    });
  }
}
