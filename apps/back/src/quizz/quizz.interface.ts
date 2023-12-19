/* eslint-disable prettier/prettier */
import { Questions } from '../questions/questions.interface';
import { UserModel } from '../user/user.interface';

export interface QuizzModel {
  id: number;
  questions: Questions;
  players: UserModel[];
}
