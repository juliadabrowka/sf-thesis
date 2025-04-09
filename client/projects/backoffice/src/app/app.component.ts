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
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);

  public readonly __icons = SfIcons;

  public __onElementIdClicked(elementId: number) {
    console.log(elementId);
  }

  async __createNewArticle() {
    this.articleStore.setArticle(undefined);
    await this.router.navigate(['create-article'], {
      relativeTo: this.activatedRoute,
    });
  }

  async __createNewTrip() {
    await this.router.navigate(['create-survey'], {
      relativeTo: this.activatedRoute,
    });
  }
}
