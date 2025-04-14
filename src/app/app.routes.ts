import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Questa riga è obbligatoria in questa posizione
  { path: 'home', component: HomeComponent },
  { path: 'ricette', component: RecipeComponent },
  { path: '**', redirectTo: '' } // Questa riga è obbligatoria in questa posizione per riportare sempre alla home page
];
