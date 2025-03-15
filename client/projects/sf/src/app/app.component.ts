import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TripService} from '@sf/sf-base';
import {ArticleStore} from '../../../base/src/state/article/article.store';

@Component({
  selector: 'sf-root',
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TripService, ArticleStore]
})
export class AppComponent {
}
