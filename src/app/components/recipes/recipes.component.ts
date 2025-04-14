import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from "../../shared/recipe-card/recipe-card.component";

@Component({
  selector: 'app-recipes',
  imports: [RecipeCardComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipeComponent implements OnInit {
  recipeList: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipesResponse) => {
        this.recipeList = recipesResponse;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
