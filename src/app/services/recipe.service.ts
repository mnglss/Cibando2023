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

  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    //return of (RECIPES);
    return this.httpClient.get<Recipe[]>(this.apiUrl);
  }

  getRecipe(id: number): Observable<Recipe | undefined>{
    //const recipe = RECIPES.find(r => r.id === id);
    //return of (recipe);
    return this.httpClient.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}
