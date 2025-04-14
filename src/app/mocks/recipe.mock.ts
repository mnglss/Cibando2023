import { Recipe } from "../models/recipe.model";

export const RECIPES: Recipe[] = [
  {
    _id: 1,
    title: 'Cannelloni',
    description: 'Descrizione dei cannelloni',
    difficulty: 2,
    creationDate: '04/04/2025',
    image: 'https://www.pippo.it/cannelloni.jpg',
    isPublished: true
  },
  {
    _id: 2,
    title: 'Grigliata di carne mista',
    description: 'Descrizione della grigliata mista',
    difficulty: 4,
    creationDate: '04/04/2025',
    image: 'https://www.pippo.it/tagliata.jpg',
    isPublished: true
  },
  {
    _id: 3,
    title: 'Insalata mista',
    description: 'Descrizione insalata mista',
    difficulty: 1,
    creationDate: '04/04/2025',
    image: 'https://www.pippo.it/insalatamista.jpg',
    isPublished: true
  },
  {
    _id: 4,
    title: 'Torta ai pinoli',
    description: 'Descrizione torta ai pinoli',
    difficulty: 2,
    creationDate: '04/04/2025',
    image: 'https://www.pippo.it/tortapinoli.jpg',
    isPublished: true
  }
];
