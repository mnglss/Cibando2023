
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // Usato per il two way binding nei form

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbCarouselModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cibando2023';

  images = [
    {
      Id: 1,
      Titolo: 'Spaghetti al sugo'
    },
    {
      Id: 2,
      Titolo: 'Tagliata di manzo'
    },
    {
      Id: 3,
      Titolo: 'Tiramisù'
    }
  ];

  percorsoFoto = 'assets/images/';


  coloreScelto = 'green';
  colorePagina = 'gray';

  cambiaColoreAllaPagina() {
    this.colorePagina = this.coloreScelto;
  }
}
