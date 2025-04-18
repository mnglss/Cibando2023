import { NgFor, NgStyle, SlicePipe, NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink, Router, ActivatedRoute, RouteReuseStrategy, provideRouter } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  titleRecipeToDelete: string;

  constructor(
    private modalService: NgbModal,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private routeStrategy: RouteReuseStrategy) {}

  ngOnInit(): void {
    this.loadRecipes();

  }

  loadRecipes() {
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
          // this.loadRecipes();
          //location.reload(); // Ricarica la pagina per vedere l'aggiornamento della lista
          //this.resetPage(); // Ricarica la pagina per vedere l'aggiornamento della lista
          this.loadRecipes(); // Ricarica la lista delle ricette
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

  resetPage() {

    this.routeStrategy.shouldReuseRoute = () => false;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]); // Naviga di nuovo alla stessa route per forzare il caricamento)
    });
  }


}
