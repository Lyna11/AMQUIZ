/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { QuizzModel } from './quizz.interface';
import { questions } from '../questions/questions.db';

@Injectable()
export class QuizzService {
  // DB Firebase
  private collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;
  
  // Liste des quizzs
  private quizzs: QuizzModel[];

  constructor() {
    this.collection = firestore().collection('Quizz').get();
  }

  // Récupère toutes les instances de quizz
  public findAll(): QuizzModel[] {
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
    // Ajout du quizz créér au quizzs existants
    const newQuizz: QuizzModel = {
      ...quizz,
      id,
    };
    this.quizzs.push(newQuizz);
    return newQuizz;
  }

  // Supprime un quizz existant
  public delete(id: number): void {
    const index: number = this.quizzs.findIndex((quizz) => quizz.id === id);
    // Pas de quizz correspondant
    if (index === -1) {
      throw new NotFoundException('Quizz introuvable');
    }
    this.quizzs.splice(index, 1);
  }

  // Modifie un quizz existant
  public update(id: number, quizz: QuizzModel): QuizzModel {
    const index: number = this.quizzs.findIndex((quizz) => quizz.id === id);
    // Pas de quizz correspondant
    if (index === -1) {
      throw new NotFoundException('Quizz introuvable');
    }
    // Mise à jour du quizz
    const updtQuizz: QuizzModel = {
      ...quizz,
      id,
    };
    this.quizzs[index] = updtQuizz;
    return updtQuizz;
  }
}
