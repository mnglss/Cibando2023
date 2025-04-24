import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userData')) !== null) {
      this.getUserRole();
    }
  }
  title = 'Cibando2023';

  evidenziato = false;
  evidenziaTesto() {
    this.evidenziato = !this.evidenziato;
  }



  coloreScelto = 'green';
  colorePagina = 'gray';

  cambiaColoreAllaPagina() {
    this.colorePagina = this.coloreScelto;
  }


  getUserRole(){
      this.userService.getUserProfile(JSON.parse(localStorage.getItem('userData')).email)
      .subscribe(
        res => {
          this.userService.userRole.next(res.role);
        }
      );
    }
}
