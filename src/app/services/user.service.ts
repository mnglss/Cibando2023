import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //datiUtente = new Subject(); // Sincrono
  datiUtente = new ReplaySubject(); // Asincrono

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:5137/api/User'; // Example API URL
  //private apiBaseUrl = '/api/User'; // Perche 'http://localhost:5137' viene preso dal proxy.conf.json

  addUser(user: User): Observable<string> {
    var responce = this.httpClient.post<any>(`${this.apiUrl}/Signup`, user);
    return responce
  }
  updateUser(user: any) {
    return this.httpClient.put(`${this.apiUrl}/${user.id}`, user);
  }
  deleteUser(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
  getUsers() {
    return this.httpClient.get(this.apiUrl);
  }
  getUser(id: number) {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
}
