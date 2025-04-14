import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [NgFor],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipeComponent implements OnInit {
  ricepesList: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipesResponse) => {
        this.ricepesList = recipesResponse;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
