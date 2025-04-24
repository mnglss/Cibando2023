import { NgFor, NgStyle, SlicePipe, NgIf, CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { first, map, Observable, take } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-card',
  imports: [NgFor, NgStyle, RouterLink, SlicePipe, PaginatorModule, NgIf, CommonModule],
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
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {

    this.loadRecipes();
    //this.loadRecipesAsync();
  }


  // PipeAsync()
  recipeList$: Observable<Recipe[]>;
  totalRecipes: Recipe[];
  loadRecipesAsync(){
    //this.recipeList$ = this.recipeService.getRecipesAsync().pipe(map(res => this.totalRecipes= res));

      this.recipeList$ = this.recipeService.getRecipesAsync()
     .pipe(
      map(res => res.filter(r => r.difficulty>0)),
      map(res => this.totalRecipes = res)
      );

      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData !== null) {
        this.userService.userRole.subscribe({
          next: res => this.userRole = res,
        });
      }
    }

  //----------------

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
    });

    // Per risparmiare memoria
    /* this.recipeService.getRecipes().pipe(take(1), first()).subscribe({
      next: (recipesResponse) => {
        this.recipeList = recipesResponse;
      },
      error: (error) => {
        console.log(error);
      }
    }); */
  }

  inviaTitolo(imageTitle: string){
    this.messaggio.emit(imageTitle);
  }

  sendDetails(id: number){
    //this.details.emit(this.recipe.find(r=>r._id===id));
    this.details.emit(this.recipeList.find(r=>r.id===id));
  }

  slicePosition(descriptionToSlice: string): number{
    var maxLength = 240;
    if (descriptionToSlice.length < maxLength)
      return maxLength;
    let lastBlankPosition = descriptionToSlice.lastIndexOf(' ', maxLength);
    return lastBlankPosition;
  }

  sliceDescription(descriptionToSlice: string): string{
    var maxLength = 240;
    if (descriptionToSlice.length <= maxLength)
      return descriptionToSlice.slice(0, maxLength);
    let lastBlankPosition = descriptionToSlice.lastIndexOf(' ', maxLength);
    return descriptionToSlice.slice(0, lastBlankPosition) + '...';
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



  getSafeHtml(html: string): SafeHtml {
    const htmlText = this.sliceDescription(html);
    const sanitizedHtml = html.replace(/<[^>]+>/g, ''); // Rimuovi i tag HTML
    const sanitizedHtmlWithLineBreaks = sanitizedHtml.replace(/\n/g, '<br>'); // Sostituisci i ritorni a capo con <br>
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
