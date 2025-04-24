import { Routes } from '@angular/router';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { DetailComponent } from './detail/detail.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { LoggedInGuard } from '../../logged-in.guard';
import { RecipeComponent } from './recipes.component';

export const routes: Routes = [{
  path: '', component: RecipeComponent, children: [
    { path: 'recipes', component: RecipesListComponent, pathMatch: 'full' },
    { path: 'detail/:title/:id', component: DetailComponent },
    { path: 'new', component: NewRecipeComponent, canActivate: [LoggedInGuard] },
    { path: '', pathMatch: 'full', component: RecipesListComponent }
    ]
  }];
