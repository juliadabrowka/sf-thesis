import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SfActionBarComponent, SfFooterComponent } from '@sf/sf-base';
import { RouterOutlet } from '@angular/router';
import { ArticleStore } from '../../../../../base/src/state/article-store';

@Component({
  selector: 'sf-default-view',
  imports: [SfActionBarComponent, RouterOutlet, SfFooterComponent],
  templateUrl: './default-view.component.html',
  styleUrl: './default-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore],
})
export class SfBackofficeDefaultViewComponent {}
