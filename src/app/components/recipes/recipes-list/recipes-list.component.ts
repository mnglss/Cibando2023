import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
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

  constructor() { }

  ngOnInit(): void {
    this.recipeDetails = undefined;
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
