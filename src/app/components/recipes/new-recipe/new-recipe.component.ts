import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import moment from 'moment';
import { RecipeService } from '../../../services/recipe.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Importa il servizio per le notifiche
import { Select, SelectModule } from 'primeng/select';
/* import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
import { ImageModule } from 'primeng/image';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, ReactiveFormsModule, ToastModule, /* CKEditorModule, */ SelectModule, ImageModule, NgxEditorModule, NgFor],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class NewRecipeComponent implements OnInit, OnDestroy {
  difficulties = [1,2,3,4,5];
  difficultiesStar = [];
  /* difficulties = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ]; */

  /* editor = ClassicEditor;
  editorConfig = {
    licenseKey: 'GPL', // Or '<YOUR_LICENSE_KEY>'.
    plugins: [],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],
    heading: {
      options: []
    },
  }; */

  editor: Editor;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];



  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', Validators.required)
  });


  constructor(private recipeService: RecipeService, private messageService: MessageService) { }
  ngOnDestroy(): void {
    /* throw new Error('Method not implemented.'); */
    this.editor.destroy(); // Distruggi l'istanza dell'editor quando il componente viene distrutto
  };

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
    this.editor = new Editor();
    //this.editor.setContent('<p>Contenuto iniziale</p>');
  };

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
  };
  onDifficultyChange(item: string) {
    const difficultyValue = Number(this.form.controls.difficulty.value);
    this.difficultiesStar = Array(difficultyValue).fill(0).map((x,i)=>i+1); // [1,2,3,4,5]
  };

}
