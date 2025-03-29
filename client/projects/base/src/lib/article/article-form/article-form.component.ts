import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  ArticleCategory,
  ArticleDTO,
  Country,
  DefaultArticleCategoryValue,
  DefaultCountryValue,
  DefaultTripTypeValue,
  TripDTO,
  TripTermDTO,
  TripType,
} from '../../../data-types';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {ArticleStore} from '../../../state/article/article.store';
import {TripStore} from '../../../state/trip/trip.store';
import {isNil, isNotNil} from '@w11k/rx-ninja';
import {SfIconAndTextComponent} from '../../icon-and-text/icon-and-text.component';
import {SfIcons} from '../../icons';
import {QuillEditorComponent} from 'ngx-quill';
import {SfUploadComponent} from '../../upload/upload.component';
import {TripTermListComponent} from '../../trip/trip-term-list/trip-term-list.component';
import {TripTermDetailsComponent} from '../../trip/trip-term-details/trip-term-details.component';
import {UploadService} from '../../../services/upload-service.service';

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
    SfIconAndTextComponent,
    QuillEditorComponent,
    SfUploadComponent,
    TripTermListComponent,
    TripTermDetailsComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleFormComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly articleStore = inject(ArticleStore);
  private readonly tripStore = inject(TripStore);
  private readonly uploadService = inject(UploadService)

  public readonly sfArticle = input<ArticleDTO | undefined>(undefined);
  public readonly sfTrip = input<TripDTO | undefined>(undefined);
  public readonly sfLoading = input<boolean>(false);

  public readonly __icons = SfIcons;
  public readonly __controls = {
    category: new FormControl<ArticleCategory>(DefaultArticleCategoryValue, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    articleUrl: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(DefaultCountryValue, {nonNullable: true}),
    tripType: new FormControl<TripType>(DefaultTripTypeValue, {nonNullable: true}),
    tripName: new FormControl<string>('', {nonNullable: true}),
    backgroundImage: new FormControl<string>('', {nonNullable: true}),
    picture: new FormControl<File | null>(null),
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __tripTypes = Object.keys(TripType).map(k => ({
    label: TripType[k as keyof typeof TripType],
    value: k as TripType,
  }));
  public readonly __formGroup = new FormGroup(this.__controls);
  public isTripCategorySelected = false;

  constructor() {
    toObservable(this.sfArticle).pipe(
      takeUntilDestroyed()
    ).subscribe(async (article) => {
      if (article) {
        this.__formGroup.patchValue({
          category: article.ArticleCategory ?? DefaultArticleCategoryValue,
          title: article.Title ?? '',
          content: article.Content ?? '',
          country: article.Country ?? DefaultCountryValue,
          articleUrl: article.Url ?? '',
          backgroundImage: article.BackgroundImageUrl
        });

        if (article.TripDto) {
          const trip = this.sfTrip();
          if (trip) {
            this.__formGroup.patchValue({
              tripName: trip.Name,
              tripType: trip.Type,
            })
          }
        }
      }
      this.cdr.markForCheck();
    });

    this.__controls.title.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        if (value) {
          const formattedValue = value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
          this.__controls.articleUrl.setValue(formattedValue, {emitEvent: false});
        }
      });

    this.__formGroup.valueChanges
      .pipe(
        map(() => this.__formGroup.getRawValue()),
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const t = this.sfTrip();
        const tripState = isNil(t) ? new TripDTO() : t;
        const a = this.sfArticle();
        const articleState = isNil(a) ? new ArticleDTO() : a;

        articleState.Title = fg.title;
        articleState.Content = fg.content;
        articleState.ArticleCategory = fg.category;
        articleState.Country = fg.country;
        articleState.Url = fg.articleUrl;
        articleState.BackgroundImageUrl = fg.backgroundImage;

        if (this.isTripCategorySelected && tripState) {
          tripState.Type = fg.tripType ?? DefaultTripTypeValue;
          tripState.Name = fg.tripName ?? "";
        }

        tripState.ArticleId = articleState?.Id;
        this.tripStore.setTrip(tripState)

        articleState.TripId = tripState.Id;
        articleState.TripDto = this.isTripCategorySelected ? tripState : undefined;

        if (articleChanged(a, articleState)) this.articleStore.setArticle(articleState);

        this.cdr.markForCheck()
      })
  }

  __onFilesUpload(imgUrl: string) {
    this.__controls.backgroundImage.patchValue(imgUrl);
  }

  imageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.__controls.picture.patchValue(file);

      this.toBase64(file).then((value: string) => this.__controls.backgroundImage.patchValue(value))
        .catch(e => console.error(e));
    }
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    })
  }
}

export function articleChanged(prev: ArticleDTO | undefined, current: ArticleDTO) {
  if (prev?.Id !== current.Id ||
    prev?.Title !== current.Title ||
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

  const compareTripTerms = (arr1: TripTermDTO[], arr2: TripTermDTO[]) => {
    if (arr1.length !== arr2.length) return true;

    return arr1.some((term, index) => {
      const otherTerm = arr2[index];
      return term.Id !== otherTerm.Id ||
        term.DateFrom !== otherTerm.DateFrom ||
        term.DateTo !== otherTerm.DateTo ||
        term.ParticipantsCurrent !== otherTerm.ParticipantsCurrent ||
        term.ParticipantsTotal !== otherTerm.ParticipantsTotal ||
        term.Price !== otherTerm.Price;
    });
  }

  if (prev?.Id !== current.Id ||
    prev?.Type !== current.Type ||
    prev?.SurveyId !== current.SurveyId ||
    compareTripTerms(prev?.TripTermDtos, current.TripTermDtos) ||
    arraysEqualSet(prev?.TripApplicationIds ?? [], current.TripApplicationIds ?? [])) {
    return true
  }
  return false;
}
