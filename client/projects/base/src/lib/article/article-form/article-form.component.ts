import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ArticleCategory, ArticleDTO, Country, TripDTO, TripType,} from '../../../data-types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {map} from 'rxjs';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {AsyncPipe} from '@angular/common';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {SfUploadComponent} from '../../upload/upload.component';
import {ArticleStore} from '../../../state/article/article.store';

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
    AsyncPipe,
    NzDatePickerComponent,
    NzInputNumberComponent,
    SfUploadComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class SfArticleFormComponent {
  private readonly articleStore = inject(ArticleStore);

  public readonly __article$$ = this.articleStore.article();
  @Input() public set sfArticle(article: ArticleDTO | null | undefined) {
    //this.__article$$.set(article ?? undefined);

    if (article) {
      this.__formGroup.patchValue({
        category: article.ArticleCategory,
        title: article.Title,
        content: article.Content,
        country: article.Country
      })
    }
  }

  //public readonly __trip$$ = signal<TripDTO | undefined>(undefined);
  @Input() public set sfTrip(trip: TripDTO | null | undefined) {
    // this.__trip$$.set(trip ?? undefined);
    //
    // if (trip) {
    //   this.__formGroup.patchValue({
    //     dates: [trip.DateFrom, trip.DateTo],
    //     price: trip.Price,
    //     tripType: trip.Type,
    //     participantsCurrent: trip.ParticipantsCurrent,
    //     participantsTotal: trip.ParticipantsTotal
    //   })
    // }
  }

  @Input() public sfLoading: boolean | null | undefined;

  public readonly __controls = {
    category: new FormControl<ArticleCategory>(ArticleCategory.Fotorelacje, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(Country.Polska, {nonNullable: true}),
    dates: new FormControl<[Date, Date]>([new Date(), new Date()], {nonNullable: true}),
    price: new FormControl<number>(0, {nonNullable: true}),
    tripType: new FormControl<TripType>(TripType.Classic, {nonNullable: true}),
    participantsTotal: new FormControl<number>(0, {nonNullable: true}),
    participantsCurrent: new FormControl<number>(0, {nonNullable: true}),
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __tripTypes = Object.values(TripType).map(o => ({label: o, value: o}));
  public readonly __formGroup = new FormGroup(this.__controls);
  public readonly isTripCategorySelected$ = this.__controls.category.valueChanges
    .pipe(map(category => category === ArticleCategory.Wyprawy))


  constructor() {
    this.__formGroup.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        const currentTrip = new TripDTO();
        const updatedTrip = {
          ...currentTrip,
          // Type: fg.tripType,
          // Price: fg.price,
          // ParticipantsCurrent: fg.participantsCurrent,
          // ParticipantsTotal: fg.participantsTotal,
          // DateFrom: fg.dates![0],
          // DateTo: fg.dates![1]
        }

        const currentArticle = new ArticleDTO();
        const updatedArticle = {
          ...currentArticle,
          Title: fg.title,
          Content: fg.content,
          ArticleCategory: fg.category,
          Country: fg.country,
          TripDto: this.isTripCategorySelected$ ? updatedTrip : undefined,
          TripId: updatedTrip.Id,
        } as ArticleDTO;

        if (articleChanged(currentArticle, updatedArticle)) {
          await this.articleStore.setArticle(updatedArticle);
          //this.store.dispatch(setTrip({trip: updatedArticle.TripDto}))
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
    prev.ArticleCategory !== current.ArticleCategory ||
    prev.TripId !== current.TripId ||
    prev.TripDto?.Type !== current.TripDto?.Type ||
    prev.TripDto?.ParticipantsCurrent !== current.TripDto?.ParticipantsCurrent ||
    prev.TripDto?.ParticipantsTotal !== current.TripDto?.ParticipantsTotal ||
    prev.TripDto?.DateFrom !== current.TripDto?.DateFrom ||
    prev.TripDto?.DateTo !== current.TripDto?.DateTo ||
    prev.TripDto?.SurveyId !== current.TripDto?.SurveyId ||
    prev.TripDto?.Price !== current.TripDto?.Price ||
    arraysEqualSet(prev.TripDto?.TripApplicationIds ?? [], current.TripDto?.TripApplicationIds ?? [])
  ) {
    return true;
  }
  return false;
}

