import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute: per leggere la rotta attiva / Router: per collegarmi alla pagina in esito ad un evento


@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  recipeDetail: Recipe;

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
    const id = Number(this.activatedRoute.snapshot.paramMap.get('_id'));
    this.recipeSerice.getRecipe(id).subscribe({
      next: (recipeResponse) => {
        this.recipeDetail = recipeResponse;
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
