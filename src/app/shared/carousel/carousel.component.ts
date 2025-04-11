import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  imports: [NgbCarouselModule, CommonModule, NgFor],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
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
}
