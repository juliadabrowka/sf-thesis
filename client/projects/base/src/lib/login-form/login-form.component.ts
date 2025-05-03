import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService, SfButtonComponent } from '@sf/sf-base';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';

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
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfLoginFormComponent {
  private readonly __iconService = inject(NzIconService);
  private readonly __authService = inject(AuthService);
  private readonly __router = inject(Router);
  private readonly __destroyRef = inject(DestroyRef);

  public readonly controls = {
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  };
  public readonly formGroup = new FormGroup(this.controls);
  protected loginError = signal<string | undefined>(undefined);

  constructor() {
    this.__iconService.addIcon(LockOutline, UserOutline);
  }

  public submitForm() {
    const username = this.controls.username.value;
    const password = this.controls.password.value;

    this.__authService
      .login(username, password)
      .pipe(takeUntilDestroyed(this.__destroyRef))
      .subscribe(async (response) => {
        if (response && response.token) {
          this.__authService.saveToken(response.token);
          await this.__router.navigate(['admin-backoffice']);
        } else {
          this.loginError.set('Logowanie nie powiodło się. Sprawdź dane.');
        }
      });
  }
}
