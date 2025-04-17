import { RecipeCardComponent } from './../../shared/recipe-card/recipe-card.component';
import { Component, OnInit, ElementRef, viewChild, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, NgClass, NgStyle, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  evidenziato = false;
  recipeList: Recipe[];

  nomeUtente: string;
  emailUtente: string;

  @ViewChild('modalRegistration', {static: false}) myModalAfterRegistration: ElementRef;

  constructor(
    //private recipeService: RecipeService,
    private userService: UserService){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.getLastRecipes();

    this.userService.datiUtente.subscribe((res: any) => {
      this.nomeUtente = res.nome;
      this.emailUtente = res.email;

      this.openModal(this.myModalAfterRegistration);
    })
  }

  evidenziaTesto() {
    this.evidenziato = !this.evidenziato;
  }



  coloreScelto = 'green';
  colorePagina = 'gray';

  cambiaColoreAllaPagina() {
    this.colorePagina = this.coloreScelto;
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal registration', size: 'lg', centered: true }).result
    .then((result) => {
      console.log(`azione da eseguire`); // .close ngbAutofocus-AZIONE
    })
    .catch((error) => {
      console.log(`nessuna azione da eseguire`); // .dismiss
    });
  }

  /* getLastRecipes(){
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
  } */
}
