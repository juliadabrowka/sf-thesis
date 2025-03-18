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
import {BehaviorSubject, map, tap} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzDatePickerComponent, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {SfUploadComponent} from '../../upload/upload.component';
import {ArticleStore} from '../../../state/article/article.store';
import {TripStore} from '../../../state/trip/trip.store';
import {isNil, isNotNil} from '@w11k/rx-ninja';
import {JsonPipe} from '@angular/common';

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
    NzDatePickerModule,
    JsonPipe
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
  private userEditedUrl = false;

  @Input() public set sfArticle(article: ArticleDTO | null | undefined) {
    console.log(article)
    this.__article$$.next(article ?? undefined);
  }

  @Input() public set sfLoading(loading: boolean | null | undefined) {
    this.__loading$$.next(loading ?? false)
    this.cdr.markForCheck();
  }

  public readonly __controls = {
    category: new FormControl<ArticleCategory>(DefaultArticleCategoryValue, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    articleUrl: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(DefaultCountryValue, {nonNullable: true}),
    dates: new FormControl<[Date, Date]>([new Date(), new Date()]),
    price: new FormControl<number>(0),
    tripType: new FormControl<TripType>(DefaultTripTypeValue),
    participantsTotal: new FormControl<number>(0),
    participantsCurrent: new FormControl<number>(0),
    tripName: new FormControl<string>('')
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __tripTypes = Object.keys(TripType).map(o => ({label: o, value: o}));
  public readonly __formGroup = new FormGroup(this.__controls);
  public isTripCategorySelected = false;

  constructor() {
    this.__article$$.pipe(
      takeUntilDestroyed()
    ).subscribe(article => {
      console.log(article)
      if (article) {
        this.__formGroup.patchValue({
          category: article.ArticleCategory,
          title: article.Title,
          content: article.Content,
          country: article.Country,
          articleUrl: article.Url
        })

        if (article.TripDto) {
          this.__trip$$.next(article.TripDto);
          this.__formGroup.patchValue({
            tripName: article.TripDto.Name,
            dates: [article.TripDto.DateFrom, article.TripDto.DateTo],
            price: article.TripDto.Price,
            tripType: article.TripDto.Type,
            participantsCurrent: article.TripDto.ParticipantsCurrent,
            participantsTotal: article.TripDto.ParticipantsTotal
          })
        }
      } else {
        this.__formGroup.patchValue({
          category: DefaultArticleCategoryValue,
          title: "",
          content: "",
          country: DefaultCountryValue,
          articleUrl: "",
          dates: null,
          participantsCurrent: null,
          participantsTotal: null,
          price: null,
          tripName: null,
          tripType: null,
        })
      }
      this.cdr.markForCheck();
    });

    this.__formGroup.valueChanges
      .pipe(
        map(() => this.__formGroup.getRawValue()),
        map((fg) => ({
          ...fg,
          articleUrl: this.shouldAutoUpdateUrl(
            this.isTripCategorySelected
              ? fg.tripName ?? ""
              : fg.title
          )
        })),
        tap((x) => console.log(x)),
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {

        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const tripState = isNil(this.__trip$$.value) ? new TripDTO() : {...this.__trip$$.value};
        const articleState = isNil(this.__article$$.value) ? new ArticleDTO() : this.__article$$.value;

        articleState.Title = fg.title;
        articleState.Content = fg.content;
        articleState.ArticleCategory = fg.category;
        articleState.Country = fg.country;
        articleState.Url = fg.articleUrl;
        console.log(fg.articleUrl)
        if (this.isTripCategorySelected && tripState) {
          tripState.Type = fg.tripType ?? DefaultTripTypeValue;
          tripState.Name = fg.tripName ?? "";
          tripState.Price = fg.price ?? 0;
          tripState.ParticipantsCurrent = fg.participantsCurrent ?? 0;
          tripState.ParticipantsTotal = fg.participantsTotal ?? 0;
          tripState.DateFrom = fg.dates ? fg.dates[0] : new Date();
          tripState.DateTo = fg.dates ? fg.dates[1] : new Date()
        }

        if (tripState && tripChanged(this.__trip$$.value, tripState)) {
          tripState.ArticleId = articleState.Id;
          this.tripStore.setTrip(tripState)
        }
        articleState.TripId = tripState ? tripState.Id : undefined;
        articleState.TripDto = this.isTripCategorySelected ? tripState : undefined;
        this.articleStore.setArticle(articleState);
        if (articleChanged(this.__article$$.value, articleState)) {

        }
        this.cdr.markForCheck()
      })
  }

  __onFilesUpload(files: NzUploadFile[]) {
    console.log(files)
  }

  private shouldAutoUpdateUrl(title: string): string {
    const urlControl = this.__controls.articleUrl;

    if (urlControl?.pristine) {
      return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    } else {
      return urlControl?.value
    }
  }
}

export function articleChanged(prev: ArticleDTO | undefined, current: ArticleDTO) {
  //console.log(prev, current)
  if (prev?.Title !== current.Title ||
    prev?.Content !== current.Content ||
    prev?.Country !== current.Country ||
    prev?.ArticleCategory !== current.ArticleCategory ||
    prev?.Url !== current.Url ||
    isNotNil(prev?.TripDto) || isNotNil(current.TripDto)
  ) {
    console.log("TRUE")
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
