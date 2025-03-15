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
import {BehaviorSubject} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzDatePickerComponent, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {SfUploadComponent} from '../../upload/upload.component';
import {ArticleStore} from '../../../state/article/article.store';
import {TripStore} from '../../../state/trip/trip.store';
import {isNotNil} from '@w11k/rx-ninja';

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
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const currentTrip = this.__trip$$.value ?? new TripDTO();
        const updatedTrip = {
          ...currentTrip,
          Type: fg.tripType ?? DefaultTripTypeValue,
          Price: fg.price ?? 0,
          ParticipantsCurrent: fg.participantsCurrent ?? 0,
          ParticipantsTotal: fg.participantsTotal ?? 0,
          DateFrom: fg.dates![0],
          DateTo: fg.dates![1]
        }

        const currentArticle = this.__article$$.value ?? new ArticleDTO();
        const updatedArticle = {
          ...currentArticle,
          Title: fg.title,
          Content: fg.content,
          ArticleCategory: fg.category,
          Country: fg.country,
          TripDto: this.isTripCategorySelected ? updatedTrip : undefined,
          TripId: updatedTrip.Id,
        } as ArticleDTO;

        if (articleChanged(currentArticle, updatedArticle)) {
          this.articleStore.setArticle(updatedArticle);
          this.tripStore.setTrip(updatedTrip)
        }

      })
  }

  __onFilesUpload(files: NzUploadFile[]) {
    console.log(files)
  }
}

export function articleChanged(prev: ArticleDTO, current: ArticleDTO) {
  const arraysEqualSet = (arr1: number[], arr2: number[]): boolean => {
    return arr1.length === arr2.length && new Set(arr1).size === new Set([...arr1, ...arr2]).size;
  }

  if (prev.Title !== current.Title ||
    prev.Content !== current.Content ||
    prev.Country !== current.Country ||
    prev.ArticleCategory !== current.ArticleCategory
  ) {
    if (isNotNil(prev.TripDto) || isNotNil(current.TripDto)) {
      if (prev.TripId !== current.TripId ||
        prev.TripDto?.Type !== current.TripDto?.Type ||
        prev.TripDto?.ParticipantsCurrent !== current.TripDto?.ParticipantsCurrent ||
        prev.TripDto?.ParticipantsTotal !== current.TripDto?.ParticipantsTotal ||
        prev.TripDto?.DateFrom !== current.TripDto?.DateFrom ||
        prev.TripDto?.DateTo !== current.TripDto?.DateTo ||
        prev.TripDto?.SurveyId !== current.TripDto?.SurveyId ||
        prev.TripDto?.Price !== current.TripDto?.Price ||
        arraysEqualSet(prev.TripDto?.TripApplicationIds ?? [], current.TripDto?.TripApplicationIds ?? [])) {
        return true
      }
    }
    return true;
  }
  return false;
}

