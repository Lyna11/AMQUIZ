interface QuestionChoice {
  id: number;
  body: string;
}

export interface Questions {
  // Le thème (ex: Naruto)
  [theme: string]: [
    {
      // Index de la question
      index: number;
      // Contenu de la question
      body: string;
      // Réponses possibles
      choices: QuestionChoice[];
      // ID de la réponse correcte
      answerId: number;
    },
  ];
}
