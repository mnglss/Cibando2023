import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipes/recipes.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // Questa riga è obbligatoria in questa posizione
  { path: 'home', component: HomeComponent },
  { path: 'recipe', component: RecipeComponent, children: [
    { path: '', component: RecipesListComponent, pathMatch: 'full' },
    { path: 'detail/:title/:_id', component: DetailComponent }, // Routing dinamico
    ]
  },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '' } // Questa riga è obbligatoria in questa posizione per riportare sempre alla home page
];
