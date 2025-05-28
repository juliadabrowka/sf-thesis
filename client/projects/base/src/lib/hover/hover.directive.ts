import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: '[sfHover]',
})
export class SfHoverDirective {
  public readonly hoverValue = input<(hover: boolean) => void>();

  @HostListener('mouseenter')
  onEnter() {
    this.hoverValue()?.(true);
  }

  @HostListener('mouseleave')
  onLeave() {
    this.hoverValue()?.(false);
  }
}
