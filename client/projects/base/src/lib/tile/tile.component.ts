import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ArticleDTO, SfIcons} from '@sf/sf-base';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sf-tile',
  imports: [
    FaIconComponent
  ],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  private readonly router = inject(Router);
  private readonly activatedAroute = inject(ActivatedRoute);

  public sfArticle = input<ArticleDTO | null | undefined>();
  private __article$ = toObservable(this.sfArticle);
  public __article$$ = new BehaviorSubject<ArticleDTO | undefined>(undefined);

  public readonly __icons = SfIcons;

  constructor() {
    this.__article$
      .pipe(takeUntilDestroyed())
      .subscribe(article => this.__article$$.next(article ?? undefined))
  }

  async __goToArticle(value: ArticleDTO | undefined) {
    if (!value) throw Error('No article but should be');
    await this.router.navigate([value.Url], {relativeTo: this.activatedAroute})
    console.log(value);
  }
}
