import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {ArticleDTO, SfArticleFormComponent, SfButtonComponent, SfIconAndTextComponent, SfIcons} from '@sf/sf-base';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {ArticleStore} from '../../../../../base/src/state/article/article.store';

@Component({
  selector: 'sf-backoffice-article-view',
  imports: [
    SfButtonComponent,
    SfArticleFormComponent,
    NzCardComponent,
    SfIconAndTextComponent,
    NzTooltipDirective,
    NzButtonComponent
  ],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeArticleViewComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(ArticleStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService)

  public readonly __article$$ = signal<ArticleDTO | undefined>(undefined);
  public readonly __loading$$ = this.store.loading()
  public readonly __icons = SfIcons;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        if (params.get('articleId')) {
          const id = Number(params.get('articleId'));
          await this.store.loadArticleDetails(id)

          this.cdr.markForCheck();
        }
      });
  }

  async __onSaveClick() {
    const article = this.__article$$();
    if (article) {
      await this.store.updateArticle(article);
      if (!this.__loading$$) {
        this.message.success('Post poprawnie aktualizowany');
        await this.router.navigate(['admin-backoffice']);
      }
    }
  }

  async __onCreateClick() {
    const article = this.__article$$();
    console.log(article)
    if (article) {
      await this.store.createArticle(article);
      if (!this.__loading$$) {
        this.message.success('Post poprawnie dodany');
        await this.router.navigate(['admin-backoffice']);
      }

    }
  }

  public __removeArticle(articleId: number | undefined) {
    if (!articleId) {
      throw new Error('Article id is undefined but should not be.');
    }
    console.log(articleId);
  }
}
