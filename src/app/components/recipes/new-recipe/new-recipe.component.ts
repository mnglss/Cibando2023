import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import moment from 'moment';
import { RecipeService } from '../../../services/recipe.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Importa il servizio per le notifiche
/* import { Select } from 'primeng/select'; */


@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, ReactiveFormsModule, ToastModule ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss',
  providers: [MessageService]
})
export class NewRecipeComponent {
  //difficulties = [1,2,3,4,5];
  difficulties = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];




  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    difficulty: new FormControl(this.difficulties, Validators.required)
  });


  constructor(private recipeService: RecipeService, private messageService: MessageService) { }

  onSubmit() {
    const addRecipe: Recipe = {
      id : 0,
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      imageUrl: this.form.controls.imageUrl.value,
      difficulty: Number(this.form.controls.difficulty.value),
      createdAt: moment().format('DD/MM/YYYY'),
      isPublished: true
    };
    console.log(addRecipe);
    this.recipeService.createRecipe(addRecipe).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'New Recipe',
          detail: 'Ricetta aggiunta con successo!',
          life: 3000 // Durata del messaggio in millisecondi
         }); // Mostra il messaggio di successo
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'New Recipe',
          detail: 'Errore durante la creazione della ricetta',
          life: 3000
         });
        //alert('Errore durante la creazione della ricetta: ' + error.message); // Mostra un messaggio di errore all'utente
      }
    });
  }
}
