import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import {
  SfIconAndTextComponent,
  SfIcons,
  SourceOfInformation,
  Status,
  TripApplicationDTO,
} from '@sf/sf-base';
import { NzTableCellDirective, NzTableModule } from 'ng-zorro-antd/table';
import { TripApplicationStore } from '../../../state/trip-application-store';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { SfTripApplicationModalComponent } from '../trip-application-modal/trip-application-modal.component';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sf-trip-application-list',
  imports: [
    NzCardComponent,
    SfIconAndTextComponent,
    NzTableCellDirective,
    NzTableModule,
    FaIconComponent,
    NzTooltipDirective,
    SfTripApplicationModalComponent,
    NzSelectComponent,
    FormsModule,
  ],
  templateUrl: './trip-application-list.component.html',
  styleUrl: './trip-application-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfTripApplicationListComponent {
  private readonly tripApplicationStore = inject(TripApplicationStore);
  private readonly messageService = inject(NzMessageService);

  public readonly icons = SfIcons;
  public readonly sfTripApplications = computed(() =>
    this.tripApplicationStore.tripApplications(),
  );

  public readonly columns = computed(() => [
    'Nazwa wyprawy',
    'Imię uczestniczki',
    'Numer telefonu',
    'Status ankiety',
    'Podgląd',
    'Jak się dowiedziała?',
  ]);

  public readonly tripApplications = signal<TripApplicationDTO[]>([]);
  public readonly channels = signal([
    {
      label: 'Facebook',
      value: SourceOfInformation.Facebook,
    },
    {
      label: 'Instagram',
      value: SourceOfInformation.Instagram,
    },
    {
      label: 'Polecenie',
      value: SourceOfInformation.Recommendation,
    },
  ]);
  public readonly statusCompleted = Status.Completed;

  constructor() {
    effect(() => {
      const tripApplications = this.sfTripApplications().map(
        (tripApplication) => ({
          ...tripApplication,
          Status: tripApplication.Status,
        }),
      );

      this.tripApplications.set(tripApplications);
    });
  }

  async updateTripApplication(
    source: SourceOfInformation,
    tripApplication: TripApplicationDTO,
  ) {
    tripApplication.SourceOfInformation = source;
    await this.tripApplicationStore.updateTripApplication(tripApplication);

    this.messageService.success('Zgłoszenie zostało poprawnie zaktualizowane');
  }
}
