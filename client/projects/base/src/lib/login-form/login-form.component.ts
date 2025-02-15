import {Component, DestroyRef, inject} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzIconModule, NzIconService} from 'ng-zorro-antd/icon';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {AuthService, SfButtonComponent} from '@sf/sf-base';
import {LockOutline, UserOutline} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'sf-login-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzRowDirective,
    NzColDirective,
    NzInputDirective,
    SfButtonComponent,
    NzIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class SfLoginFormComponent {
  private readonly iconService = inject(NzIconService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly __controls = {
    username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  }
  public readonly __formGroup = new FormGroup(this.__controls);
  protected loginError: string | undefined;

  constructor() {
    this.iconService.addIcon(LockOutline, UserOutline);
  }

  public __submitForm() {
    const username = this.__controls.username.value;
    const password = this.__controls.password.value;

    this.authService.login(username, password)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(async (response) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);
          await this.router.navigate(['admin-backoffice']);
        } else {
          this.loginError = 'Logowanie nie powiodło się. Sprawdź dane.';
        }
      });
  }
}
