import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { CarouselComponent } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, NgClass, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
