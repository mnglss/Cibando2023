import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { RecipeCardComponent } from "../../../shared/recipe-card/recipe-card.component";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-recipes-list',
  imports: [RecipeCardComponent, NgIf],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})

export class RecipesListComponent implements OnInit{
  recipeList: Recipe[];
  imageTitle: string;
  recipeDetails: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeDetails = undefined;
    this.recipeService.getRecipes().subscribe({
      next: (recipesResponse) => {
        this.recipeList = recipesResponse;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  riceviTitolo(e: string) {
    this.imageTitle = this.imageTitle == e ? '' : e ;
  }

  getDetails(e: any){
    if (this.recipeDetails){
      this.recipeDetails = this.recipeDetails._id == e._id ?  undefined : e ;
    }
    else {
      this.recipeDetails = e;
    }
  }
}
