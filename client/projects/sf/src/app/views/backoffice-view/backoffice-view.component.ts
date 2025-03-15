import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ArticleStore} from '../../../../../base/src/state/article/article.store';

@Component({
  selector: 'sf-backoffice-view',
  imports: [
    RouterOutlet
  ],
  templateUrl: './backoffice-view.component.html',
  styleUrl: './backoffice-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeViewComponent {

}
