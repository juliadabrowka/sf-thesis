import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SfActionBarComponent} from '@sf/sf-base';
import {RouterOutlet} from '@angular/router';
import {ArticleStore} from '../../../../../base/src/state/article/article.store';

@Component({
  selector: 'sf-default-view',
  imports: [
    SfActionBarComponent,
    RouterOutlet
  ],
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfBackofficeDefaultViewComponent {

}
