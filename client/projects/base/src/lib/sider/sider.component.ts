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
import { ArticleCategory, TripType } from '../../data-types';

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
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __store = inject(ArticleStore);

  protected readonly icons = SfIcons;
  public readonly sfOnElementClicked = output<number>();

  public async goToRecommendations() {
    this.__store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.__router.navigate(['recommendations'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToTips() {
    this.__store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.__router.navigate(['tips'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToStories() {
    this.__store.setCategoryFilter(ArticleCategory.Rekomendacje);
    await this.__router.navigate(['photo-stories'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToClassicTrips() {
    this.__store.setCategoryFilter(ArticleCategory.Wyprawy);
    this.__store.setTripFilter(TripType.Classic);
    await this.__router.navigate(['classic-trips'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToWeekendTrips() {
    this.__store.setCategoryFilter(ArticleCategory.Wyprawy);
    this.__store.setTripFilter(TripType.Weekend);
    await this.__router.navigate(['weekend-trips'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToBikeTrips() {
    this.__store.setCategoryFilter(ArticleCategory.Wyprawy);
    this.__store.setTripFilter(TripType.Bike);
    await this.__router.navigate(['bike-trips'], {
      relativeTo: this.__activatedRoute,
    });
  }

  public async goToSurveys() {
    await this.__router.navigate(['surveys'], {
      relativeTo: this.__activatedRoute,
    });
  }
}
