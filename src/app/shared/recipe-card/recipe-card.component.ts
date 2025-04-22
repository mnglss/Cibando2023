import { NgFor, NgStyle, SlicePipe, NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recipe-card',
  imports: [NgFor, NgStyle, RouterLink, SlicePipe, PaginatorModule, NgIf],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent implements OnInit {
  recipeList: Recipe[];
  @Output() messaggio = new EventEmitter<string>();
  @Output() details = new EventEmitter<Recipe>();

  @Input() pageCaller;

  page = 1;
  ricepesForPage = 4;
  userRole: any;

  titleRecipeToDelete: string;

  constructor(
    private modalService: NgbModal,
    private recipeService: RecipeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.loadRecipes();
  }

  loadRecipes() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData !== null) {
      this.userService.userRole.subscribe({
        next: res => this.userRole = res,
      });
    }
    this.recipeService.getRecipes().subscribe({
      next: (recipesResponse) => {
        this.recipeList = recipesResponse;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  inviaTitolo(imageTitle: string){
    this.messaggio.emit(imageTitle);
  }

  sendDetails(id: number){
    //this.details.emit(this.recipe.find(r=>r._id===id));
    this.details.emit(this.recipeList.find(r=>r.id===id));
  }

  sliceDescription(descriptionToSlice: string): number{
    var maxLength = 240;
    if (descriptionToSlice.length < maxLength)
      return maxLength;
    let lastBlankPosition = descriptionToSlice.indexOf(' ', maxLength);
    return lastBlankPosition;
  }

  onPageChange(event){
    event.page = event.page+1;
    this.page = event.page;
  }

  openDeleteModal(content: any, idRecipe: number) {
    this.titleRecipeToDelete = this.recipeList.find(r => r.id === idRecipe).title;
    this.modalService.open(content, { ariaLabelledBy: 'modal delete recipe', size: 'lg', centered: true }).result
    .then((result) => {
      console.log(`Elimina ricetta`); // .close ngbAutofocus-AZIONE
      //alert(`Elimina ricetta ${this.titleRecipeToDelete}`);
      this.recipeService.deleteRecipe(idRecipe).subscribe({
        next: (response) => {
          console.log(response);
          this.loadRecipes();
        },
        error: (error) => {
          console.log(error);
        }
      });
    })
    .catch((error) => {
      console.log(`Annula eliminazione ricetta`); // .dismiss
      alert(`La ricetta ${this.titleRecipeToDelete} non verrà eliminata`);
    });
  }



}
