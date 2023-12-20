/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { QuizzModel } from './quizz.interface';
import { questions } from '../questions/questions.db';
 
@Injectable()
export class QuizzService {
  // Liste des quizzs
  private quizzs: QuizzModel[] = [];

  // Constructeur
  constructor() {
    this.fetchQuizzs;
  }

  // Charge la collection des Quizzs de Firebase
  private async loadQuizzs(): Promise<void> {
    try {
      const quizzCollection = await admin.firestore().collection('Quizz').get();
      quizzCollection.forEach((doc) => {
        const quizzData = doc.data() as QuizzModel;
        quizzData.questions = questions[quizzData.theme];
        this.quizzs.push(quizzData);
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors du chargement des quizzs');
    }
  }

  // Méthode de vérification Quizzs
  private async fetchQuizzs(): Promise<void> {
    if (this.quizzs.length === 0) {
      await this.loadQuizzs();
    }
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
