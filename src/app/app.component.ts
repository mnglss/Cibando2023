import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cibando2023';

  nomeFoto = 'foto del mare con le onde';
  label = 'mare toscana';

  urlFoto = 'https://i.etsystatic.com/51401719/r/il/43761f/6113922330/il_300x300.6113922330_l3jz.jpg';

  images = [
    {
      Id: 1,
      Label: 'Spaghetti al sugo'
    },
    {
      Id: 2,
      Label: 'Tagliata di manzo'
    },
    {
      Id: 3,
      Label: 'Tiramisù'
    }
  ];

  percorsoFoto = 'assets/images/';

  scriviLog() {
    console.log('Hai cliccato col mouse sopra la foto!');
  }


}
