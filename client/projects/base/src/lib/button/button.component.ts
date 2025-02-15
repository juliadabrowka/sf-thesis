import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'sf-button',
  imports: [
    NzButtonComponent
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class SfButtonComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly __text$$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly __disabled$$ = new BehaviorSubject<boolean>(false)

  @Input() public set sfButtonText(text: string | null | undefined) {
    this.__text$$.next(text ?? undefined);
    this.cdr.markForCheck();
  }

  @Input() public set sfDisabled(disabled: boolean | null | undefined) {
    this.__disabled$$.next(disabled ?? false);
    this.cdr.detectChanges();
  }

  @Output() public readonly sfOnButtonClicked = new EventEmitter<void>();
}
