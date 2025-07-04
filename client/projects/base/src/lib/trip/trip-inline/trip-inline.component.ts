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
import {
  ArticleStore,
  SfButtonComponent,
  TripApplicationDTO,
  TripDTO,
} from '@sf/sf-base';
import { ApplicationFormComponent } from '../../application-form/application-form.component';
import { Router } from '@angular/router';
import { TripApplicationStore } from '../../../state/trip-application-store';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  private readonly __articleStore = inject(ArticleStore);
  private readonly __tripApplicationStore = inject(TripApplicationStore);
  private readonly __messageService = inject(NzMessageService);

  public readonly sfTripInfo = input<TripFlag | null | undefined>();
  public readonly showSlider = signal(false);
  public readonly disabled = signal(true);

  public __onShowSlider() {
    this.showSlider.set(!this.showSlider());
  }

  async navigateToTrip(trip: TripDTO) {
    if (trip.ArticleId === undefined) {
      throw new Error('Article trip id not found');
    }
    await this.__articleStore.getArticleDetails(trip.ArticleId);
    const article = this.__articleStore.article();

    if (article === undefined) {
      throw new Error('Article not found');
    }
    await this.__router.navigate([article.Url]);
  }

  async createTripApplication(tripApplication: TripApplicationDTO) {
    const trip = this.sfTripInfo()?.trip;
    tripApplication.TripDTO = trip;
    tripApplication.TripId = trip?.Id;

    await this.__tripApplicationStore.createTripApplication(tripApplication);
    this.__messageService.success('Zgłoszenie zostało wysłane. Dziękujemy!');
    this.showSlider.set(false);
  }
}
