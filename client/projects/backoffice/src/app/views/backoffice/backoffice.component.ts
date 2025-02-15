import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {NzMenuDirective, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {SfIconAndTextComponent, SfIcons, SfSiderComponent} from '@sf/sf-base';
import {NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {Store} from '@ngrx/store';
import {setArticle} from '@sf/sf-shared';


@Component({
  selector: 'sf-backoffice',
  imports: [
    RouterOutlet,
    NzMenuDirective,
    NzSubMenuComponent,
    SfIconAndTextComponent,
    SfSiderComponent,
    NzContentComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent
  ],
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.css'
})
export class SfBackofficeComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store)

  public readonly __icons = SfIcons;

  public __onElementIdClicked(elementId: number) {
    console.log(elementId);
  }

  async __goToCreateNewArticle() {
    this.store.dispatch(setArticle({article: undefined}))
    await this.router.navigate(['create-article'], {relativeTo: this.activatedRoute});
  }
}
