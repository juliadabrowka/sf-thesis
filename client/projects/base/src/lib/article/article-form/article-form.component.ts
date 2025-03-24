import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, ViewChild,} from '@angular/core';
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
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzDatePickerComponent, NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {ArticleStore} from '../../../state/article/article.store';
import {TripStore} from '../../../state/trip/trip.store';
import {isNil, isNotNil} from '@w11k/rx-ninja';
import {SfIconAndTextComponent} from '../../icon-and-text/icon-and-text.component';
import {SfIcons} from '../../icons';
import {QuillEditorComponent} from 'ngx-quill';

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
    NzDatePickerModule,
    SfIconAndTextComponent,
    QuillEditorComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleFormComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly articleStore = inject(ArticleStore);
  private readonly tripStore = inject(TripStore);

  public readonly __icons = SfIcons;
  public readonly __trip$$ = new BehaviorSubject<TripDTO | undefined>(undefined);
  public readonly __loading$$ = new BehaviorSubject<boolean>(false);

  public sfArticle = input<ArticleDTO | undefined>(undefined);
  private readonly __article$ = toObservable(this.sfArticle);

  public sfTrip = input<TripDTO | undefined>(undefined);
  private readonly __trip$ = toObservable(this.sfTrip)

  public sfLoading = input<boolean>(false);
  private readonly __loading$ = toObservable(this.sfLoading)

  public readonly __controls = {
    category: new FormControl<ArticleCategory>(DefaultArticleCategoryValue, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    articleUrl: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(DefaultCountryValue, {nonNullable: true}),
    dates: new FormControl<[Date, Date]>([new Date(), new Date()]),
    price: new FormControl<number>(0, {nonNullable: true}),
    tripType: new FormControl<TripType>(DefaultTripTypeValue, {nonNullable: true}),
    participantsTotal: new FormControl<number>(0, {nonNullable: true}),
    participantsCurrent: new FormControl<number>(0, {nonNullable: true}),
    tripName: new FormControl<string>('', {nonNullable: true})
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __tripTypes = Object.keys(TripType).map(k => ({
    label: TripType[k as keyof typeof TripType],
    value: k as TripType,
  }));
  public readonly __formGroup = new FormGroup(this.__controls);
  public isTripCategorySelected = false;

  @ViewChild("editor") private editorContainerRef: QuillEditorComponent | undefined;

  constructor() {
    this.__article$.pipe(
      takeUntilDestroyed()
    ).subscribe(article => {
      if (article) {
        this.__formGroup.patchValue({
          category: article.ArticleCategory ?? DefaultArticleCategoryValue,
          title: article.Title ?? '',
          content: article.Content ?? '',
          country: article.Country ?? DefaultCountryValue,
          articleUrl: article.Url ?? ''
        });

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
      }
      this.cdr.markForCheck();
    });

    this.__formGroup.valueChanges
      .pipe(
        map(() => this.__formGroup.getRawValue()),
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const tripState = isNil(this.__trip$$.value) ? new TripDTO() : {...this.__trip$$.value};
        const a = await firstValueFrom(this.__article$);
        const articleState = isNil(a) ? new ArticleDTO() : a;

        articleState.Title = fg.title;
        articleState.Content = fg.content;
        articleState.ArticleCategory = fg.category;
        articleState.Country = fg.country;
        articleState.Url = fg.articleUrl;

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
          tripState.ArticleId = articleState?.Id;
          this.tripStore.setTrip(tripState)
        }

        articleState.TripId = tripState.Id;
        articleState.TripDto = this.isTripCategorySelected ? tripState : undefined;

        if (articleChanged(a, articleState))
        this.articleStore.setArticle(articleState);

        this.cdr.markForCheck()
      })
  }
  __onFilesUpload(files: NzUploadFile[]) {
    console.log(files)
  }

  public shouldAutoUpdateUrl(title: string): string {
    const urlControl = this.__controls.articleUrl;

    if (urlControl?.pristine) {
      const t = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      this.__controls.articleUrl.patchValue(t);
      return t;
    } else {
      this.__controls.articleUrl.patchValue(urlControl?.value);
      return urlControl?.value
    }
  }
}

export function articleChanged(prev: ArticleDTO | undefined, current: ArticleDTO) {
  if (prev?.Title !== current.Title ||
    prev?.Content !== current.Content ||
    prev?.Country !== current.Country ||
    prev?.ArticleCategory !== current.ArticleCategory ||
    prev?.Url !== current.Url ||
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
