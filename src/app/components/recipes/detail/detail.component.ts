import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute: per leggere la rotta attiva / Router: per collegarmi alla pagina in esito ad un evento
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-detail',
  imports: [NgIf, NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  recipeDetail: Recipe;
  difficultyPathImage = '../../../assets/images/Difficolta_';

  //numbers = Array(5).fill().map((x,i)=>i); // [0,1,2,3,4]
  difficulties = []; // [1,2,3,4,5]

  constructor(
    private recipeSerice: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.onGetRecipe();
  }

  // 1° Metodo di recupero parametri da url (snapshot)
  onGetRecipe(): void {
    // Recuperare id dalla url per 1 parametro
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeSerice.getRecipe(id).subscribe({
      next: (recipeResponse) => {
        this.recipeDetail = recipeResponse;
        this.difficulties = Array(this.recipeDetail.difficulty).fill(0).map((x,i)=>i+1); // [1,2,3,4,5]
        console.log('Questa è la ricetta richiesta: ' + this.recipeDetail.title);
      },
      error: (error) => {
        console.log(error);
      }
    })
  };

  // 2° Metodo alternativo tramite params => quando devo recuperare piu parametri
  onGetRecipe2(): void {
    this.activatedRoute.params.subscribe((urlParams) => {
      const id = Number(urlParams['_id']);
      this.recipeSerice.getRecipe(id).subscribe(responseDetail => this.recipeDetail = responseDetail)
    });

  }
}
