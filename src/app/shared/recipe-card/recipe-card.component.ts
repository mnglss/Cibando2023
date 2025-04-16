import { NgFor, NgStyle, SlicePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [NgFor, NgStyle, RouterLink, SlicePipe],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe: Recipe[];
  @Output() messaggio = new EventEmitter<string>();
  @Output() details = new EventEmitter<Recipe>();


  inviaTitolo(imageTitle: string){
    this.messaggio.emit(imageTitle);
  }

  sendDetails(id: number){
    this.details.emit(this.recipe.find(r=>r._id===id));
  }

  sliceDescription(descriptionToSlice: string): number{
    var maxLength = 240;
    if (descriptionToSlice.length < maxLength)
      return maxLength;
    let lastBlankPosition = descriptionToSlice.indexOf(' ', maxLength);
    return lastBlankPosition;
  }
}
