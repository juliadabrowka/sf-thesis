import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {ArticleDTO, SfArticleFormComponent, SfButtonComponent, SfIconAndTextComponent, SfIcons} from '@sf/sf-base';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {createArticle, loadArticleDetails, selectCurrentArticle, updateArticle} from '@sf/sf-shared';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzButtonComponent} from 'ng-zorro-antd/button';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfBackofficeArticleViewComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly message = inject(NzMessageService)

  public readonly __article$$ = signal<ArticleDTO | undefined>(undefined);
  public readonly __icons = SfIcons;

  constructor() {
    this.store.select(selectCurrentArticle)
      .pipe(
        takeUntilDestroyed())
      .subscribe(article => {
        this.__article$$.set(article);
      });

    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        if (params.get('articleId')) {
          const id = Number(params.get('articleId'));
          this.store.dispatch(loadArticleDetails({id}));

          this.cdr.markForCheck();
        }
      });
  }

  async __onSaveClick() {
    const article = this.__article$$();
    if (article) {
      this.store.dispatch(updateArticle({article}));
      this.message.success('Post poprawnie aktualizowany');
      await this.router.navigate(['admin-backoffice']);
    }
  }

  async __onCreateClick() {
    const article = this.__article$$();
    if (article) {
      this.store.dispatch(createArticle({article}));
      this.message.success('Post poprawnie dodany');
      //await this.router.navigate(['admin-backoffice']);
    }
  }

  public __removeArticle(articleId: number | undefined) {
    if (!articleId) {
      throw new Error('Article id is undefined but should not be.');
    }
    console.log(articleId);
  }
}
