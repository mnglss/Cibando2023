import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //datiUtente = new Subject(); // Sincrono
  datiUtente = new ReplaySubject(); // Asincrono

  constructor() { }
}
