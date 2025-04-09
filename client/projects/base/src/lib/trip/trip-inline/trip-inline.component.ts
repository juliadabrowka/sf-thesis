import { Component, inject, input, ViewEncapsulation } from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly store = inject(ArticleStore);

  public readonly sfTripInfo = input<TripFlag | null | undefined>();
  public __showSlider = false;

  public __onShowSlider() {
    this.__showSlider = !this.__showSlider;
  }

  async __navigateToTrip(trip: TripDTO) {
    if (trip.ArticleId === undefined) {
      throw new Error('Article trip id not found');
    }
    await this.store.loadArticleDetails(trip.ArticleId);
    const article = this.store.article();

    console.log(article);

    if (article === undefined) {
      throw new Error('Article not found');
    }
    await this.router.navigate([article.Url]);
  }
}
