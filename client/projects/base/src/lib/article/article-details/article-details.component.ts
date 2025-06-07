import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleStore } from '../../../state/article-store';
import { PageTitleFramedComponent } from '../../page-title-framed/page-title-framed.component';
import { ArticleDetailsInnerComponent } from '../article-details-inner/article-details-inner.component';
import { SfSkeletonComponent } from '../../skeleton/skeleton.component';
import { ArticleSiderComponent } from '../article-sider/article-sider.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { SfArticleVerticalDisplayComponent } from '../article-vertical-display/article-vertical-display.component';
import { SfFilterArticlesByTypePipe } from '../../main-page/filter-articles-by-type.pipe';
import { ArticleCategory } from '../../../data-types';

interface ArticleDisplayCustom {
  framedTitle: string;
  sectionTitle?: string;
  description?: string;
}

@Component({
  selector: 'sf-article-details',
  imports: [
    PageTitleFramedComponent,
    ArticleDetailsInnerComponent,
    SfSkeletonComponent,
    ArticleSiderComponent,
    NzDividerComponent,
    SfArticleVerticalDisplayComponent,
    SfFilterArticlesByTypePipe,
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfArticleDetailsComponent {
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);

  public readonly article = computed(() => this.__articleStore.article());
  public readonly loading = computed(() => this.__articleStore.loading());

  public readonly articles = computed(() => this.__articleStore.articles());
  public readonly customLink = signal<string | undefined>(undefined);

  public readonly articleDisplayCustom = signal<ArticleDisplayCustom>({
    framedTitle: '',
  });
  public readonly tips = ArticleCategory.Tips;
  public readonly recommendations = ArticleCategory.Recommendations;

  constructor() {
    this.__activatedRoute.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const param = params.get('customLink');
        if (param) this.customLink.set(param);
      });

    effect(async () => {
      if (this.customLink()) {
        const link = this.customLink();
        const articles = this.articles();
        if (articles) {
          const article = articles.find((a) => a.Url === link);

          if (article && article.Id) {
            await this.__articleStore.getArticleDetails(article.Id);
          } else {
            this.__articleStore.setArticle(undefined);
            switch (link) {
              case 'ciekawostki':
                return this.articleDisplayCustom.set({
                  framedTitle: 'Ciekawostki',
                });
              case 'wakacje-dla-aktywnych':
                return this.articleDisplayCustom.set({
                  framedTitle: 'Wakacje dla aktywnych',
                  sectionTitle:
                    'Chcesz zamienić marzenie o wyprawie rowerowej w rzeczywistość?',
                  description:
                    'Chcesz odwiedzić wszystkie te miejsca leżące z dala od głównych dróg? Chcesz poznać ludzi i ich historie? Będzimy cichymi odkrywcami w odkrytym już świecie…Dzięki własnym mięśniom i determinacji. Wystarczy żebyś się odważyła i żeby Ci się zachciało. Dołącz do naszych rowerowych wypraw, zobacz co kryje się za zakrętem. Wyprawy rowerowe to nie tylko odkrywanie świata, ale i naszego ja. Dowiesz się więcej niż kiedykolwiek wcześniej, o swojej sile i swoich słabościach. To właśnie magia roweru…Zapraszamy na wyprawy marzeń.',
                });
              case 'serwis-informacyjny':
                return this.articleDisplayCustom.set({
                  framedTitle: 'Fotorelacje z podróży',
                });
              case 'rekomendacje':
                return this.articleDisplayCustom.set({
                  framedTitle: 'Rekomendacje',
                });
              case 'wyjazdy-weekendowe':
                return this.articleDisplayCustom.set({
                  framedTitle: 'Weekendowe wojaże - krótkie wyajzdy tu i tam',
                  sectionTitle:
                    'Masz ochotę na aktywną przygodę rowerową w weekend?',
                  description:
                    'Naładuj baterie, bądź poza zasięgiem i poczuj wiatr we włosach. To przepis na święty spokój. Ruch, słońce i powietrze, to gwarancja zdrowia i naszej odporności. Daj się porwać w klimat natury, ciepłych ludzi i regionalnych smaków. Zapraszamy wszystkie kobiety, szukające niesztampowych i kameralnych wyjazdów weekendowych, wycieczek rowerowych, które dostarczą pięknych wspomnień na długi czas.',
                });
            }
          }
        }
      }
    });
  }
}
