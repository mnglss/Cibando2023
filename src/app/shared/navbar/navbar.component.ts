import { NgIf } from '@angular/common';
import { Component, DoCheck } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements DoCheck {
  user: User;
  isLogged: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngDoCheck(): void { // E' sempre in ascolto dei cambiamenti
    const userData = localStorage.getItem('userData');
    this.isLogged = userData !== null;
    if (this.isLogged) {
      this.user = JSON.parse(userData);
    } else {
      //this.user.role = '';
    }
  }

  logout(): void {
    this.authService.logout(); // Chiama il metodo di logout del servizio AuthService
    this.router.navigate(['/home']); // Reindirizza alla home page
  }
}
