import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from './customValidator';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$')]),
    repeatPassword: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue)
  },
    [CustomValidator.MatchValidator('password','repeatPassword')]
  );

  onSubmit(){
    console.log(this.form);
  }

}
