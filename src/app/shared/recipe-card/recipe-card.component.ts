import { NgFor, NgStyle, SlicePipe, NgIf } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { PaginatorModule } from 'primeng/paginator'

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

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
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
    this.details.emit(this.recipeList.find(r=>r._id===id));
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
}
