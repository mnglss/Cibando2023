import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CarouselComponent } from "./shared/carousel/carousel.component";
import { NavbarComponent } from "./shared/navbar/navbar.component"; // Usato per il two way binding nei form

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CarouselComponent, NgClass, NgStyle, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
}
