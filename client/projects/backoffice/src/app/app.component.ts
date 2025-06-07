import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { NzMenuDirective, NzSubMenuComponent } from 'ng-zorro-antd/menu';
import {
  ArticleStore,
  SfIconAndTextComponent,
  SfIcons,
  SfSiderComponent,
  SurveyStore,
} from '@sf/sf-base';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzSubMenuComponent,
    SfIconAndTextComponent,
    SfSiderComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly __router = inject(Router);
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __articleStore = inject(ArticleStore);
  private readonly __surveyStore = inject(SurveyStore);

  public readonly icons = SfIcons;

  public onElementIdClicked(elementId: number) {
    console.log(elementId);
  }

  async createNewArticle() {
    this.__articleStore.setArticle(undefined);
    await this.__router.navigate(['create-article'], {
      relativeTo: this.__activatedRoute,
    });
  }

  async createNewTrip() {
    this.__articleStore.setArticle(undefined);
    await this.__router.navigate(['create-trip'], {
      relativeTo: this.__activatedRoute,
    });
  }

  async createNewSurvey() {
    this.__surveyStore.setSurvey(undefined);
    await this.__router.navigate(['create-survey'], {
      relativeTo: this.__activatedRoute,
    });
  }
}
