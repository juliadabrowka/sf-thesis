import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ArticleCategory, ArticleDTO, Country,} from '../../../data-types';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective, NzTextareaCountComponent} from 'ng-zorro-antd/input';
import {UploadComponent} from '../../upload/upload.component';
import {setArticle} from '@sf/sf-shared';

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
    NzTextareaCountComponent,
    UploadComponent,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SfArticleFormComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(Store);

  @Input() public set sfArticle(article: ArticleDTO | null | undefined) {
    this.__article$$.set(article ?? undefined);

    if (article) {
      this.__formGroup.patchValue({
        category: article.ArticleCategory,
        title: article.Title,
        content: article.Content,
        country: article.Country
      })
    }

    this.cdr.markForCheck();
  }

  public readonly __controls = {
    category: new FormControl<ArticleCategory>(ArticleCategory.Fotorelacje, {nonNullable: true}),
    title: new FormControl<string>('', {nonNullable: true}),
    content: new FormControl<string>('', {nonNullable: true}),
    country: new FormControl<Country>(Country.Polska, {nonNullable: true}),
  };
  public readonly __categories = Object.values(ArticleCategory).map(o => ({label: o, value: o}));
  public readonly __countries = Object.values(Country).map(o => ({label: o, value: o}));
  public readonly __formGroup = new FormGroup(this.__controls);
  public readonly __article$$ = signal<ArticleDTO | undefined>(undefined);

  constructor() {
    this.__formGroup.valueChanges
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(async (fg) => {
        const currentArticle = this.__article$$() ?? new ArticleDTO();
        const updatedArticle = {
          ...currentArticle,
          Title: fg.title,
          Content: fg.content,
          ArticleCategory: fg.category,
          Country: fg.country
        } as ArticleDTO;

        if (articleChanged(currentArticle, updatedArticle)) {
          this.store.dispatch(setArticle({article: updatedArticle}));
        }

        this.cdr.markForCheck()
      })
  }

  __onFilesUpload(files: NzUploadFile[]) {
    console.log(files)
  }

}

export function articleChanged(prev: ArticleDTO, current: ArticleDTO) {
  if (prev.Title !== current.Title ||
    prev.Content !== current.Content ||
    prev.Country !== current.Country ||
    prev.ArticleCategory !== current.ArticleCategory ||
    prev.TripId !== current.TripId
  ) {
    return true;
  }
  return false;
}

