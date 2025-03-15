import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {SfIconAndTextComponent, SfIcons, SfSiderComponent} from '@sf/sf-base';
import {ArticleStore} from '../../../base/src/state/article/article.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent, NzMenuDirective, NzSubMenuComponent, SfIconAndTextComponent, SfSiderComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ArticleStore]
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(ArticleStore)

  public readonly __icons = SfIcons;

  public __onElementIdClicked(elementId: number) {
    console.log(elementId);
  }

  async __createNewArticle() {
    //await this.store.setArticle(undefined)
    await this.router.navigate(['create-article'], {relativeTo: this.activatedRoute});
  }

  async __createNewTrip() {
    //this.store.dispatch(setTrip({trip: undefined}))
    await this.router.navigate(['create-trip'], {relativeTo: this.activatedRoute});
  }

}
