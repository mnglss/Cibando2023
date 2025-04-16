import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue)
  });

  /* onSubmit(registrationForm: any){
    console.log(registrationForm);
  } */

    onSubmit(){
      console.log(this.form.value);
    }

}
