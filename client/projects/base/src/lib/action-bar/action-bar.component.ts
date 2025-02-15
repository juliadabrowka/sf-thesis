import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {NzDropDownDirective, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {SfIcons} from '../icons';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-action-bar',
  imports: [
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    FaIconComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css'
})
export class SfActionBarComponent {
  protected readonly __icons = SfIcons;
  public currentActionBarClass: string = "action-bar-default-page";
  public currentActionsClass = "actions-default";

  constructor(
    private readonly router: Router
  ) {
    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {

          if (event.url === '/') {
            this.currentActionBarClass = 'action-bar-default-page';
            this.currentActionsClass = "actions-default";
          } else if (event.url === '/admin') {
            this.currentActionBarClass = 'action-bar-display-hidden'
          } else {
            this.currentActionBarClass = 'action-bar-other-page'
            this.currentActionsClass = "actions-bw";
          }
        }
      })
  }
}
