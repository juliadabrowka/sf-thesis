import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {SfIconAndTextComponent} from '../icon-and-text/icon-and-text.component';
import {SfIcons} from '../icons';
import {NzCollapseComponent, NzCollapseModule, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzSiderComponent} from 'ng-zorro-antd/layout';
import {ArticleDTO} from '../../data-types';

@Component({
  selector: 'sf-sider',
  imports: [
    NzCollapseComponent,
    NzCollapsePanelComponent,
    SfIconAndTextComponent,
    NzCollapseModule,
    NzSiderComponent
  ],
  templateUrl: './sider.component.html',
  styleUrl: './sider.component.css'
})
export class SfSiderComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly __icons = SfIcons;
  public readonly __posts$$ = signal<ArticleDTO[]>([]);

  @Input() public set sfPosts(posts: ArticleDTO[] | null | undefined) {
    this.__posts$$.set(posts ?? []);
    this.cdr.markForCheck();
  }

  @Output() sfOnElementClicked = new EventEmitter<number>();
}
