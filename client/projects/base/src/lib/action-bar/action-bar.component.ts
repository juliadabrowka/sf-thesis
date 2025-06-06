import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SfIcons } from '../icons';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sf-action-bar',
  imports: [
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    FaIconComponent,
    RouterLink,
    NgClass,
  ],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfActionBarComponent implements OnInit, OnDestroy {
  private readonly __router = inject(Router);
  private readonly __destroyRef = inject(DestroyRef);
  private readonly __cdr = inject(ChangeDetectorRef);

  public readonly icons = SfIcons;
  public readonly currentActionBarClass = signal('action-bar-default-page');
  public readonly transformBarHeight = signal(false);

  ngOnInit() {
    this.updateActionBarClasses();

    this.__router.events
      .pipe(takeUntilDestroyed(this.__destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateActionBarClasses();
        }
      });

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private updateActionBarClasses() {
    const currentUrl = this.__router.url;

    if (currentUrl === '/') {
      this.currentActionBarClass.set('action-bar-default-page');
    } else if (
      currentUrl.startsWith('/admin') ||
      currentUrl.includes('/trip-application/')
    ) {
      this.currentActionBarClass.set('action-bar-display-hidden');
    } else {
      this.currentActionBarClass.set('action-bar-other-page');
    }
  }

  private onScroll(): void {
    const scrollPosition = window.scrollY;
    this.transformBarHeight.set(scrollPosition > 150);
    this.transformBarHeight()
      ? this.currentActionBarClass.set('action-bar-other-page')
      : this.currentActionBarClass.set('action-bar-default-page');
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }
}
