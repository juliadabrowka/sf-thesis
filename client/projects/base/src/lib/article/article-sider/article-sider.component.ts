import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ArticleStore } from '@sf/sf-base';
import { SfArticleSiderDataPipe } from './sf-map-articles-to-sider-data.pipe';
import { SliceTextComponent } from '../../slice-text/slice-text.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sf-article-sider',
  imports: [SfArticleSiderDataPipe, SliceTextComponent, RouterLink],
  templateUrl: './article-sider.component.html',
  styleUrl: './article-sider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSiderComponent {
  private readonly __store = inject(ArticleStore);

  public readonly articles = computed(() => this.__store.articles());
}
