import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ArticleStore} from '../../../../../../base/src/state/article/article.store';

@Component({
  selector: 'sf-main-page-view',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './main-page-view.component.html',
  styleUrl: './main-page-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeMainPageViewComponent {

}
