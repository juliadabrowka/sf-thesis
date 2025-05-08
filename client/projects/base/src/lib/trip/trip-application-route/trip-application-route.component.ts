import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TripApplicationStore } from '../../../state/trip-application-store';
import { TripApplicationDTO } from '@sf/sf-base';
import { SfTripApplicationComponent } from '../trip-application/trip-application.component';

@Component({
  selector: 'sf-trip-application-route',
  imports: [SfTripApplicationComponent],
  templateUrl: './trip-application-route.component.html',
  styleUrl: './trip-application-route.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripApplicationRouteComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tripApplicationStore = inject(TripApplicationStore);

  private readonly __tripApplication =
    this.tripApplicationStore.tripApplication;

  public readonly tripApplication = signal<TripApplicationDTO | undefined>(
    undefined,
  );

  constructor() {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(async (params) => {
        const hash = params.get('hash') as string;
        if (hash)
          await this.tripApplicationStore.getTripApplicationByHash(hash);
      });

    effect(() => {
      const tripApplication = this.__tripApplication();

      this.tripApplication.set(tripApplication);
    });
  }
}
