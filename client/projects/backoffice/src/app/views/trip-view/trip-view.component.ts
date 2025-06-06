import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import {
  ArticleCategory,
  ArticleStore,
  SfArticleFormComponent,
  SfButtonComponent,
  SfIconAndTextComponent,
  SfIcons,
  TripType,
} from '@sf/sf-base';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SfSkeletonComponent } from '../../../../../base/src/lib/skeleton/skeleton.component';

@Component({
  selector: 'sf-backoffice-trip-view',
  imports: [
    SfSkeletonComponent,
    NzCardComponent,
    SfArticleFormComponent,
    SfButtonComponent,
    SfIconAndTextComponent,
  ],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfBackofficeTripViewComponent {
  private readonly __articleStore = inject(ArticleStore);
  private readonly __message = inject(NzMessageService);
  private readonly __router = inject(Router);

  public readonly article = computed(() => this.__articleStore.article());
  public readonly loading = computed(() => this.__articleStore.loading());
  public readonly icons = SfIcons;

  public readonly articleWithCategoryTrip = computed(() => {
    const article = this.article();
    if (!article) return;

    return {
      ...article,
      ArticleCategory: ArticleCategory.Trips,
      Type: TripType.Classic,
    };
  });

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
}
