import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  ArticleCategory,
  ArticleDTO,
  Country,
  DefaultArticleCategoryValue,
  DefaultCountryValue,
  DefaultTripTypeValue,
  TripDTO,
  TripType,
} from '../../../data-types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {BehaviorSubject, map} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzDatePickerComponent, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {SfUploadComponent} from '../../upload/upload.component';
import {ArticleStore} from '../../../state/article/article.store';
import {TripStore} from '../../../state/trip/trip.store';
import {isNil, isNotNil} from '@w11k/rx-ninja';

@Component({
  selector: 'sf-article-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzInputDirective,
    NzDatePickerComponent,
    NzInputNumberComponent,
    SfUploadComponent,
    NzDatePickerModule
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleFormComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly articleStore = inject(ArticleStore);
  private readonly tripStore = inject(TripStore);

  public readonly __article$$ = new BehaviorSubject<ArticleDTO | undefined>(undefined);
  public readonly __trip$$ = new BehaviorSubject<TripDTO | undefined>(undefined);
  public readonly __loading$$ = new BehaviorSubject<boolean>(false);
  public readonly __currentArticle$$ = computed(() => this.articleStore.currentArticle());

  @Input() public set sfArticle(article: ArticleDTO | null | undefined) {
    this.__article$$.next(article ?? undefined);

    if (article) {
      this.__formGroup.patchValue({
        category: article.ArticleCategory,
        title: article.Title,
        content: article.Content,
        country: article.Country
      })
    }
  }
  @Input() public set sfTrip(trip: TripDTO | null | undefined) {
    this.__trip$$.next(trip ?? undefined);

    if (trip) {
      this.__formGroup.patchValue({
        dates: [trip.DateFrom, trip.DateTo],
        price: trip.Price,
        tripType: trip.Type,
        participantsCurrent: trip.ParticipantsCurrent,
        participantsTotal: trip.ParticipantsTotal
      })
    }
  }

  @Input() public set sfLoading(loading: boolean | null | undefined) {
    this.__loading$$.next(loading ?? false)
    this.cdr.markForCheck();
  }

  public readonly __controls = {
    category: new FormControl<ArticleCategory>(DefaultArticleCategoryValue, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(DefaultCountryValue, {nonNullable: true}),
    dates: new FormControl<[Date, Date]>([new Date(), new Date()], {nonNullable: true}),
    price: new FormControl<number>(0, {nonNullable: true}),
    tripType: new FormControl<TripType>(DefaultTripTypeValue, {nonNullable: true}),
    participantsTotal: new FormControl<number>(0, {nonNullable: true}),
    participantsCurrent: new FormControl<number>(0, {nonNullable: true}),
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __tripTypes = Object.values(TripType).map(o => ({label: o, value: o}));
  public readonly __formGroup = new FormGroup(this.__controls);
  public isTripCategorySelected = false;

  constructor() {
    this.__formGroup.valueChanges
      .pipe(
        map(() => this.__formGroup.getRawValue()),
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const tripState = isNil(this.__trip$$.value) ? new TripDTO() : {...this.__trip$$.value};

        tripState.Type = fg.tripType;
        tripState.Price = fg.price;
        tripState.ParticipantsCurrent = fg.participantsCurrent;
        tripState.ParticipantsTotal = fg.participantsTotal;
        tripState.DateFrom = fg.dates[0];
        tripState.DateTo = fg.dates[1]

        const articleState = isNil(this.__article$$.value) ? new ArticleDTO() : this.__article$$.value;

        articleState.Title = fg.title;
        articleState.Content = fg.content;
        articleState.ArticleCategory = fg.category;
        articleState.Country = fg.country;
        articleState.TripDto = this.isTripCategorySelected ? tripState : undefined;
        articleState.TripId = tripState.Id || undefined;

        if (tripChanged(this.__trip$$.value, tripState)) {
          tripState.ArticleId = articleState.Id;
          this.tripStore.setTrip(tripState)
        }
        articleState.TripDto = tripState;
        if (articleChanged(this.__article$$.value, articleState)) {
          this.articleStore.setArticle(articleState);
        }

      })
  }

  __onFilesUpload(files: NzUploadFile[]) {
    console.log(files)
  }
}

export function articleChanged(prev: ArticleDTO | undefined, current: ArticleDTO) {
  if (prev?.Title !== current.Title ||
    prev?.Content !== current.Content ||
    prev?.Country !== current.Country ||
    prev?.ArticleCategory !== current.ArticleCategory ||
    isNotNil(prev?.TripDto) || isNotNil(current.TripDto)
  ) {
    return true;
  }
  return false;
}

export function tripChanged(prev: TripDTO | undefined, current: TripDTO) {
  const arraysEqualSet = (arr1: number[], arr2: number[]): boolean => {
    return arr1.length === arr2.length && new Set(arr1).size === new Set([...arr1, ...arr2]).size;
  }

  if (prev?.Id !== current.Id ||
    prev?.Type !== current.Type ||
    prev?.ParticipantsCurrent !== current.ParticipantsCurrent ||
    prev?.ParticipantsTotal !== current.ParticipantsTotal ||
    prev?.DateFrom !== current.DateFrom ||
    prev?.DateTo !== current.DateTo ||
    prev?.SurveyId !== current.SurveyId ||
    prev?.Price !== current.Price ||
    arraysEqualSet(prev?.TripApplicationIds ?? [], current.TripApplicationIds ?? [])) {
    return true
  }
  return false;
}
