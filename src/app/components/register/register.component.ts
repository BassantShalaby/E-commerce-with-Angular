import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        userEmail: ['', [Validators.required, Validators.email]],
        userUserName: [
          '',
          [Validators.required, Validators.pattern('\\s*\\S+\\s*')],
        ],
        userPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        coPassword: ['', [Validators.required]],
      },
      { validator: this.confirmPassword }
    );
  }

  confirmPassword(formGroup: any) {
    const { value: password } = formGroup.get('userPassword');
    const { value: confirmPassword } = formGroup.get('coPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.validateAllFormFields(this.registerForm);
    } else {
      this.router.navigate(['/all-products']);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
