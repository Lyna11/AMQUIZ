/* eslint-disable prettier/prettier */
import { Questions } from '../questions/questions.interface';
import { Player } from '../player/player.interface';

export interface QuizzModel {
  id: number;
  questions: Questions;
  players: Player[];
}
