import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  ArticleStore,
  SfArticleFormComponent,
  SfButtonComponent,
  SfIconAndTextComponent,
  SfIcons,
} from '@sf/sf-base';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'sf-backoffice-article-view',
  imports: [
    SfButtonComponent,
    SfArticleFormComponent,
    NzCardComponent,
    SfIconAndTextComponent,
    NzTooltipDirective,
    NzButtonComponent,
    MatProgressSpinner,
  ],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfBackofficeArticleViewComponent {
  private readonly __articleStore = inject(ArticleStore);
  private readonly __route = inject(ActivatedRoute);
  private readonly __router = inject(Router);
  private readonly __message = inject(NzMessageService);

  public readonly article = computed(() => this.__articleStore.article());
  public readonly loading = this.__articleStore.loading;
  public readonly icons = SfIcons;

  constructor() {
    this.__route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        if (params.get('articleId')) {
          const id = Number(params.get('articleId'));
          await this.__articleStore.getArticleDetails(id);
        }
      });
  }

  async onSaveClick() {
    const article = this.article();
    if (article) {
      await this.__articleStore.updateArticle(article);
      if (!this.loading()) {
        this.__message.success('Post poprawnie aktualizowany');
      } else {
        this.__message.error('Post nie został poprawnie aktualizowany');
      }
      await this.__router.navigate(['admin-backoffice']);
    }
  }

  async onCreateClick() {
    const article = this.article();
    if (article) {
      await this.__articleStore.createArticle(article);
      if (!this.loading()) {
        this.__message.success('Post poprawnie dodany');
      } else {
        this.__message.error('Post nie został dodany');
      }
      await this.__router.navigate(['admin-backoffice']);
    }
  }

  public async removeArticle(articleId: number | undefined) {
    if (!articleId) {
      throw new Error('Article id is undefined but should not be.');
    }
    await this.__articleStore.deleteArticles([articleId]);

    if (!this.loading()) {
      this.__message.success('Post poprawnie usunięty');
      await this.__router.navigate(['admin-backoffice']);
    }
  }
}
