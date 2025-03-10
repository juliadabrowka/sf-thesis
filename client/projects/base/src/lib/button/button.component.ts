import {ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";

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

  public readonly __text$$ = signal<string | undefined>(undefined);
  public readonly __disabled$$ = signal<boolean>(false)

  @Input() public set sfButtonText(text: string | null | undefined) {
    this.__text$$.set(text ?? undefined);
    this.cdr.markForCheck();
  }

  @Input() public set sfDisabled(disabled: boolean | null | undefined) {
    this.__disabled$$.set(disabled ?? false);
    this.cdr.detectChanges();
  }

  @Output() public readonly sfOnButtonClicked = new EventEmitter<void>();
}
