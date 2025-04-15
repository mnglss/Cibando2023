import { NgFor, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [NgFor, NgStyle, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe: Recipe[]
}
