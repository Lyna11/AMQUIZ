import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizzModel } from '../quizz/quizz.interface';

@Injectable()
export class QuizzService {
  private quizzs: Array<QuizzModel> = [];

  // Récupère toutes les instances de quizz
  public findAll(): Array<QuizzModel> {
    return this.quizzs;
  }

  // Récupère un quizz par son ID
  public findOne(id: number): QuizzModel {
    const quizz: QuizzModel = this.quizzs.find((quizz) => quizz.id === id);

    if (!quizz) {
      throw new NotFoundException('Quizz not found.');
    }

    return quizz;
  }

  // Créer un quizz
  public create(quizz: QuizzModel): QuizzModel {
    // Récupère le premier ID disponible
    const maxId: number = Math.max(...this.quizzs.map((quizz) => quizz.id), 0);
    const id: number = maxId + 1;
    const newQuizz: QuizzModel = {
      ...quizz,
      id,
    };
    // Ajout du quizz créér au quizzs existants
    this.quizzs.push(newQuizz);
    return newQuizz;
  }
}
