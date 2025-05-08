import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  TripTypeLabels,
} from '../../../data-types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ArticleStore } from '../../../state/article-store';
import { isNil, isNotNil } from '@w11k/rx-ninja';
import { SfIconAndTextComponent } from '../../icon-and-text/icon-and-text.component';
import { SfIcons } from '../../icons';
import { QuillEditorComponent } from 'ngx-quill';
import { SfUploadComponent } from '../../upload/upload.component';
import { TripTermDetailsComponent } from '../../trip/trip-term-details/trip-term-details.component';
import { QuillModules } from 'ngx-quill/config/quill-editor.interfaces';

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
    TripTermDetailsComponent,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleFormComponent {
  private readonly __cdr = inject(ChangeDetectorRef);
  private readonly __articleStore = inject(ArticleStore);

  public readonly sfArticle = input<ArticleDTO | undefined>(undefined);
  public readonly sfLoading = input<boolean>(false);

  public readonly icons = SfIcons;
  public readonly controls = {
    category: new FormControl<ArticleCategory>(DefaultArticleCategoryValue, {
      validators: Validators.required,
      nonNullable: true,
    }),
    title: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    articleUrl: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    content: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    country: new FormControl<Country>(DefaultCountryValue, {
      validators: Validators.required,
      nonNullable: true,
    }),
    tripType: new FormControl<TripType>(DefaultTripTypeValue, {
      nonNullable: true,
    }),
    tripName: new FormControl<string>('', { nonNullable: true }),
    backgroundImage: new FormControl<string>('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    picture: new FormControl<File | null>(null),
  };
  public readonly categories = Object.values(ArticleCategory).map((o) => ({
    label: o,
    value: o,
  }));
  public readonly countries = Object.values(Country).map((o) => ({
    label: o,
    value: o,
  }));
  public readonly tripTypes = Object.keys(TripType).map((k) => ({
    label: TripTypeLabels[k as keyof typeof TripType],
    value: k as TripType,
  }));
  public readonly formGroup = new FormGroup(this.controls);
  public isTripCategorySelected = false;

  public readonly quillConfig: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],

      [{ header: 1 }, { header: 2 }, { header: 3 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ font: [] }],
      [{ align: [] }],

      ['link', 'image', 'video'],
    ],
  };

  constructor() {
    effect(() => {
      const article = this.sfArticle();

      this.formGroup.patchValue({
        category: article?.ArticleCategory ?? DefaultArticleCategoryValue,
        title: article?.Title ?? '',
        content: article?.Content ?? '',
        country: article?.Country ?? DefaultCountryValue,
        articleUrl: article?.Url ?? '',
        backgroundImage: article?.BackgroundImageUrl,
        tripName: article?.TripDTO?.Name,
        tripType: article?.TripDTO?.Type,
      });
    });

    this.controls.title.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value) {
          const formattedValue = value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
          this.controls.articleUrl.setValue(formattedValue, {
            emitEvent: false,
          });
        }
      });

    this.formGroup.valueChanges
      .pipe(
        map(() => this.formGroup.getRawValue()),
        takeUntilDestroyed(),
      )
      .subscribe((fg) => {
        this.isTripCategorySelected = fg.category === ArticleCategory.Wyprawy;
        const article = this.sfArticle();
        const articleState = isNil(article) ? new ArticleDTO() : article;

        articleState.Title = fg.title;
        articleState.Content = fg.content;
        articleState.ArticleCategory = fg.category;
        articleState.Country = fg.country;
        articleState.Url = fg.articleUrl;
        articleState.BackgroundImageUrl = fg.backgroundImage;

        if (this.isTripCategorySelected) {
          const trip = articleState.TripDTO ?? new TripDTO();
          trip.Type = fg.tripType ?? DefaultTripTypeValue;
          trip.Name = fg.tripName ?? '';
          trip.ArticleId = articleState?.Id;
          trip.TripTermIds = articleState.TripDTO?.TripTermIds ?? [];
          trip.TripTermDTOS = articleState.TripDTO?.TripTermDTOS ?? [];

          trip.TripApplicationIds =
            articleState.TripDTO?.TripApplicationIds ?? [];
          trip.TripApplicationDTOS =
            articleState.TripDTO?.TripApplicationDTOS ?? [];

          articleState.TripId = articleState.TripDTO?.Id;
          articleState.TripDTO = trip;
        }

        if (articleChanged(article, articleState))
          this.__articleStore.setArticle(articleState);

        this.__cdr.markForCheck();
      });
  }

  __onFilesUpload(imgUrl: string) {
    this.controls.backgroundImage.patchValue(imgUrl);
  }

  __onTripTermAdded(tripTerms: TripTermDTO[]) {
    const a = this.sfArticle();
    if (!a) {
      throw new Error('Article is undefined but should not be');
    }
    const t = a.TripDTO;
    if (!t) {
      throw new Error('Trip is undefined but should not be');
    }
    t.TripTermDTOS = tripTerms;
    t.TripTermIds =
      tripTerms
        .map((tt) => tt.Id)
        .filter((id): id is number => id !== undefined) ?? [];

    const updatedArticle = { ...a, TripDTO: t };
    this.__articleStore.setArticle(updatedArticle);
  }
}

export function articleChanged(
  prev: ArticleDTO | undefined,
  current: ArticleDTO,
) {
  return (
    prev?.Id !== current.Id ||
    prev?.Title !== current.Title ||
    prev?.Content !== current.Content ||
    prev?.Country !== current.Country ||
    prev?.ArticleCategory !== current.ArticleCategory ||
    prev?.Url !== current.Url ||
    isNotNil(prev?.TripDTO) ||
    isNotNil(current.TripDTO)
  );
}
export function tripChanged(prev: TripDTO | undefined, current: TripDTO) {
  const arraysEqualSet = (arr1: number[], arr2: number[]): boolean => {
    return (
      arr1.length === arr2.length &&
      new Set(arr1).size === new Set([...arr1, ...arr2]).size
    );
  };

  const compareTripTerms = (arr1: TripTermDTO[], arr2: TripTermDTO[]) => {
    if (arr1.length !== arr2.length) return true;

    return arr1.some((term, index) => {
      const otherTerm = arr2[index];
      return (
        term.Id !== otherTerm.Id ||
        term.DateFrom !== otherTerm.DateFrom ||
        term.DateTo !== otherTerm.DateTo ||
        term.ParticipantsCurrent !== otherTerm.ParticipantsCurrent ||
        term.ParticipantsTotal !== otherTerm.ParticipantsTotal ||
        term.Price !== otherTerm.Price ||
        term.TripId !== otherTerm.TripId ||
        term.TripDTO !== otherTerm.TripDTO
      );
    });
  };

  if (
    prev?.Id !== current.Id ||
    prev?.Type !== current.Type ||
    prev?.SurveyId !== current.SurveyId ||
    compareTripTerms(prev?.TripTermDTOS, current.TripTermDTOS) ||
    arraysEqualSet(
      prev?.TripApplicationIds ?? [],
      current.TripApplicationIds ?? [],
    )
  ) {
    return true;
  }
  return false;
}
