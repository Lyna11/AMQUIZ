/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { QuestionsModel } from '../questions/questions.interface';
import { UserModel } from '../user/user.interface';
=======
import { Questions } from '../questions/questions.interface';
import { Player } from '../player/player.interface';
>>>>>>> yoann

export interface QuizzModel {
  // ID du Quizz
  id: number;
<<<<<<< HEAD
  // Thème du Quizz
  theme: string;
  // Questions du Quizz
  questions: QuestionsModel;
  // Joueurs du Quizz
  players: UserModel[];
=======
  questions: Questions;
  players: Player[];
>>>>>>> yoann
}
