import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TripDetailsShortComponent } from '../../trip/trip-details-short/trip-details-short.component';
import { ArticleSiderComponent } from '../article-sider/article-sider.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { QuillViewComponent } from 'ngx-quill';
import { SfReviewsComponent } from '../../reviews/reviews.component';
import { ArticleDTO } from '@sf/sf-base';

@Component({
  selector: 'sf-article-details-inner',
  imports: [
    TripDetailsShortComponent,
    ArticleSiderComponent,
    NzDividerComponent,
    QuillViewComponent,
    SfReviewsComponent,
  ],
  templateUrl: './article-details-inner.component.html',
  styleUrl: './article-details-inner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailsInnerComponent {
  public readonly sfArticle = input<ArticleDTO | null | undefined>();
}
