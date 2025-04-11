import { Component, input } from '@angular/core';
import { TripDetailsShortComponent } from '../../trip/trip-details-short/trip-details-short.component';
import { ArticleSiderComponent } from '../article-sider/article-sider.component';
import { ArticleDTO } from '@sf/sf-base';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'sf-article-details-inner',
  imports: [
    TripDetailsShortComponent,
    ArticleSiderComponent,
    NzDividerComponent,
    QuillViewComponent,
  ],
  templateUrl: './article-details-inner.component.html',
  styleUrl: './article-details-inner.component.css',
})
export class ArticleDetailsInnerComponent {
  public readonly sfArticle = input<ArticleDTO | null | undefined>();
}
