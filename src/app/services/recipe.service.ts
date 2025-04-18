import { Recipe } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipe.mock';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:5137/api/Recipe'; // Example API URL
  // Oppure se l'app partre con il comando start modificato
  // private apiBaseUrl = '/api/Recipe'; // Perche 'http://localhost:5137' viene preso dal proxy.conf.json

  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    //return of (RECIPES);
    return this.httpClient.get<Recipe[]>(this.apiUrl);
  }

  getRecipe(id: number): Observable<Recipe | undefined>{
    //const recipe = RECIPES.find(r => r.id === id);
    //return of (recipe);
    // Back Tick => Alt+96 `
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}
