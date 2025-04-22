import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  private apiUrl = 'http://localhost:5137/api/User'; // Example API URL

  login(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password
    };
    return this.httpClient.post<any>(`${this.apiUrl}/Login`, { user });
  }

  saveUserData(res: any): void {
    const userData = {
      name: res.name,
      email: res.email,
      password: res.password
    }
    this.userService.userRole.next(res.role);

    localStorage.setItem('userData', JSON.stringify(userData));
  }

  isLogged(): boolean {
    const userData = localStorage.getItem('userData');
    //const u = JSON.parse(userData); // per leggere i dati
    return userData !== null;
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.userService.userRole.next('');
  }
}
