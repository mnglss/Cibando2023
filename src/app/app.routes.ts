import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipes.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard'; // Importa il guard
import { NewRecipeComponent } from './components/recipes/new-recipe/new-recipe.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Questa riga è obbligatoria in questa posizione
  { path: 'home', component: HomeComponent },
  { path: 'recipe', component: RecipeComponent, children: [
    { path: '', component: RecipesListComponent, pathMatch: 'full' },
    { path: 'detail/:title/:id', component: DetailComponent },
    { path: 'new', component: NewRecipeComponent, canActivate: [LoggedInGuard]} // Routing dinamico
    ]
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard] }, // Aggiungi il guard qui
  { path: '**', redirectTo: '' } // Questa riga è obbligatoria in questa posizione per riportare sempre alla home page
];
