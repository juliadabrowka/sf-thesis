import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { SfIconAndTextComponent } from '../icon-and-text/icon-and-text.component';
import { SfIcons } from '../icons';
import {
  NzCollapseComponent,
  NzCollapseModule,
  NzCollapsePanelComponent,
} from 'ng-zorro-antd/collapse';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleStore } from '../../state/article-store';
import { ArticleCategory } from '../../data-types';

@Component({
  selector: 'sf-sider',
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    SfIconAndTextComponent,
    NzCollapseModule,
    NzSiderComponent,
  ],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfSiderComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(ArticleStore);

  protected readonly __icons = SfIcons;
  public readonly sfOnElementClicked = output<number>();

  public async __goToRecommendations() {
    this.store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.router.navigate(['recommendations'], {
      relativeTo: this.activatedRoute,
    });
  }

  public async __goToTips() {
    this.store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.router.navigate(['tips'], {
      relativeTo: this.activatedRoute,
    });
  }

  public async __goToStories() {
    this.store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.router.navigate(['photo-stories'], {
      relativeTo: this.activatedRoute,
    });
  }
}
