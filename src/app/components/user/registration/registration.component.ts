import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from './customValidator';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';


@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule, NgIf, PasswordModule, DividerModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  regExPassword = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$';
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.regExPassword)]),
    repeatPassword: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue)
  },
    [CustomValidator.MatchValidator('password','repeatPassword')]
  );


  constructor(private userService: UserService, private router: Router){}

  onSubmit(){
    console.log(this.form);

    const user = { nome: this.form.value.name, email: this.form.value.email };

    this.userService.datiUtente.next(user);
    this.router.navigate(['home']); // redirect alla home
  }

}
