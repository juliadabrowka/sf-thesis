import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  SfIconAndTextComponent,
  SfIcons,
  TripApplicationDTO,
} from '@sf/sf-base';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SfTripApplicationComponent } from '../trip-application/trip-application.component';

@Component({
  selector: 'sf-trip-application-modal',
  imports: [NzModalModule, SfTripApplicationComponent, SfIconAndTextComponent],
  templateUrl: './trip-application-modal.component.html',
  styleUrl: './trip-application-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripApplicationModalComponent {
  public readonly icons = SfIcons;

  public readonly sfTripApplication = input<
    TripApplicationDTO | null | undefined
  >();
  public readonly visible = signal(false);
  public readonly tripApplication = signal<TripApplicationDTO | undefined>(
    undefined,
  );

  openTripApplicationModal(tripApplication: TripApplicationDTO) {
    this.visible.set(true);
    if (tripApplication) this.tripApplication.set(tripApplication);
  }
}
