import {
  Component,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TripFlag } from '../trip-calendar/trip-calendar.component';
import { SfFormatPricePipe } from './trip-inline-format-price.pipe';
import { ArticleStore, SfButtonComponent, TripDTO } from '@sf/sf-base';
import { ApplicationFormComponent } from '../../application-form/application-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'sf-trip-inline',
  imports: [
    DatePipe,
    SfFormatPricePipe,
    SfButtonComponent,
    ApplicationFormComponent,
  ],
  templateUrl: './trip-inline.component.html',
  styleUrl: './trip-inline.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SfTripInlineComponent {
  private readonly __router = inject(Router);
  private readonly __store = inject(ArticleStore);

  public readonly sfTripInfo = input<TripFlag | null | undefined>();
  public readonly showSlider = signal(false);

  public __onShowSlider() {
    this.showSlider.set(!this.showSlider());
  }

  async navigateToTrip(trip: TripDTO) {
    if (trip.ArticleId === undefined) {
      throw new Error('Article trip id not found');
    }
    await this.__store.loadArticleDetails(trip.ArticleId);
    const article = this.__store.article();

    if (article === undefined) {
      throw new Error('Article not found');
    }
    await this.__router.navigate([article.Url]);
  }
}
