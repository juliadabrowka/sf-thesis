import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleStore, TripService } from '@sf/sf-base';

@Component({
  selector: 'sf-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TripService, ArticleStore],
})
export class AppComponent {}
