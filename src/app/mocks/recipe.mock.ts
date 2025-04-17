import { Recipe } from "../models/recipe.model";

export const RECIPES: Recipe[] = [
  {
    _id: 1,
    title: 'Cannelloni alla rossini',
    description: 'I cannelloni alla Rossini sono un piatto classico della cucina italiana, nato a cavallo tra il XIX e il XX secolo. Si tratta di un primo piatto ricco e cremoso, a base di cannelloni ripieni di un ragù di di vitello, funghi e carne, e conditi con una besciamella.',
    difficulty: 1,
    creationDate: '04/04/2025',
    image: 'https://www.cantinacaio.it/wp-content/uploads/2023/11/cannelloni-alla-rossini.jpg',
    isPublished: true
  },
  {
    _id: 2,
    title: 'Tagliata di Angus',
    description: 'La tagliata di Angus è un secondo piatto di carne molto apprezzato in Italia e nel mondo. Si tratta di una fettina di carne di manzo, proveniente dal controfiletto, che viene cotta in padella o alla griglia. La tagliata di Angus è caratterizzata da una carne tenera e succosa, con un sapore intenso e deciso.',
    difficulty: 2,
    creationDate: '04/04/2025',
    image: 'https://www.cantinacaio.it/wp-content/uploads/2023/11/tagliata-di-angus.jpg',
    isPublished: true
  },
  {
    _id: 3,
    title: 'Insalata russa',
    description: 'L’insalata russa è un piatto iconico che porta freschezza e versatilità in ogni tavola. Perfetta per ogni occasione, questa ricetta è amata da molti per il suo mix di ingredienti e sapori. In questo articolo, esploreremo la ricetta dell’insalata russa e come abbinarla ai vini di Cantina Caio per un’esperienza culinaria completa.',
    difficulty: 3,
    creationDate: '04/04/2025',
    image: 'https://www.cantinacaio.it/wp-content/uploads/2024/07/insalata-russa.jpg',
    isPublished: true
  },
  {
    _id: 4,
    title: 'Soufflé al cioccolato',
    description: 'Il soufflé al cioccolato è un dessert francese classico, conosciuto per la sua consistenza morbida e ariosa e il suo gusto intenso di cioccolato. È un dolce relativamente semplice da preparare, ma richiede un pizzico di tecnica e la giusta dose di attenzione.',
    difficulty: 4,
    creationDate: '14/04/2025',
    image: 'https://www.cantinacaio.it/wp-content/uploads/2024/07/souffle-al-cioccolato.jpg',
    isPublished: true
  },
  {
    _id: 5,
    title: 'Spaghetti al sugo',
    description: '',
    difficulty: 1,
    creationDate: '04/04/2025',
    image: '',
    isPublished: true
  },
  {
    _id: 6,
    title: 'Grigliata di mare',
    description: '',
    difficulty: 2,
    creationDate: '04/04/2025',
    image: '',
    isPublished: true
  },
  {
    _id: 7,
    title: 'Insalata tricolore',
    description: '',
    difficulty: 3,
    creationDate: '04/04/2025',
    image: '',
    isPublished: true
  },
  {
    _id: 8,
    title: 'Panna cotta',
    description: '',
    difficulty: 4,
    creationDate: '14/04/2025',
    image: '',
    isPublished: true
  }
];
