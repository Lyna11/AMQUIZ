/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizzModel } from '../quizz/quizz.interface';
import { Questions } from '../questions/questions.interface';

@Injectable()
export class QuizzService {
  private quizzs: Array<QuizzModel> = [];

  // Récupère toutes les instances de quizz
  public findAll(): Array<QuizzModel> {
    // const temporaire pour test
    const testQuizz: QuizzModel = {
      id: 417,
      questions: {},
      players: [],
    };

    return [testQuizz, ...this.quizzs];
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

  // Modifie un quizz existant
  public update(id: number, quizz: QuizzModel): QuizzModel {
    const index: number = this.quizzs.findIndex((quizz) => quizz.id === id);

    // Pas de quizz correspondant
    if (index === -1) {
      throw new NotFoundException('Quizz introuvable');
    }
    const quizzUpdate: QuizzModel = {
      ...quizz,
      id,
    };

    return quizz;
  }
}
