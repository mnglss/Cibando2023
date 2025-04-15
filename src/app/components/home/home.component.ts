import { RecipeCardComponent } from './../../shared/recipe-card/recipe-card.component';
import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, NgClass, NgStyle, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  evidenziato = false;
  recipeList: Recipe[];

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getLastRecipes();
  }

  evidenziaTesto() {
    this.evidenziato = !this.evidenziato;
  }



  coloreScelto = 'green';
  colorePagina = 'gray';

  cambiaColoreAllaPagina() {
    this.colorePagina = this.coloreScelto;
  }

  getLastRecipes(){
    this.recipeService.getRecipes().subscribe({
      next: (recipesResponse) => {
        this.recipeList = recipesResponse
        .sort((a,b) => a._id - b._id) // id in ordine crescente
        .reverse() // inverte in decrescente
        .slice(0,4); // Ultime 4 ricette
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
