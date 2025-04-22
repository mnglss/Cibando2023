import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Importa il servizio di autenticazione
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Importa il servizio per le notifiche

@Component({
  selector: 'app-login',
  imports: [FormsModule, PasswordModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService], // Aggiungi il servizio per le notifiche
})
export class LoginComponent {
  loginError: string = ''; // Messaggio di errore per il login
  user: User
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService) { } // Iniettiamo il router per la navigazione

  onSubmit(credentials: any){
    if (credentials.email !== '' || credentials.password !== '') {
      this.authService.login(credentials.email, credentials.password).subscribe(
        {
          next: (res) => {
            this.user = res; // Salva i dati dell'utente

            if (res) {
              this.authService.saveUserData(res); // Salva i dati dell'utente nel localStorage
              this.messageService.add({
                severity: 'success',
                summary: 'Login',
                detail: 'Login effettuato con successo!',
                life: 3000 // Durata del messaggio in millisecondi
               }); // Mostra il messaggio di successo

              this.router.navigate(['/home']); // Reindirizza alla home page dopo il login
            }
          },
          error: (err) => {
            this.loginError = err.error.message; // Salva il messaggio di errore);
            this.messageService.add({
              severity: 'error',
              summary: 'Login',
              detail: 'Login errato!',
              life: 3000
             }); // Durata del messaggio in millisecondi // Mostra il messaggio di errore
            console.log(err.error.message); // Mostra il messaggio di errore nella console
          }
        });
    }
  }
}
