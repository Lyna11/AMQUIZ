export interface QuestionChoice {
  id: number;
  body: string;
}

export interface Questions {
  // Le thème (ex: Naruto)
  [theme: string]: [
    {
      index: number;
      // La queston
      body: string;
      // Réponses possibles
      choices: QuestionChoice[];
      // ID de la réponse correcte
      answerId: number;
    },
  ];
}
