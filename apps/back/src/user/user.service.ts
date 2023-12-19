/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { UserModel } from './user.interface';

@Injectable()
export class UserService {
  // DB Firebase
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  // Liste des quizzs
  private users: UserModel[] = [];

  // Constructeur
  constructor() {
    this.collection = firestore().collection('Users');
  }

  // Récupère toutes les joueurs
  public findAll(): UserModel[] {
    return this.users;
  }

  // Récupère un joueur par son ID
  public findOne(id: number): UserModel {
    const user: UserModel = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  // Créer un joueur
  public create(user: UserModel): UserModel {
    // Récupère le premier ID disponible
    const maxId: number = Math.max(...this.users.map((user) => user.id), 0);
    const id: number = maxId + 1;
    // Ajout du joueur créé aux joueurs existants
    const newUser: UserModel = {
      ...user,
      id,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Supprime un joueur existant
  public delete(id: number): void {
    const index: number = this.users.findIndex((user) => user.id === id);
    // Pas de joueur correspondant
    if (index === -1) {
      throw new NotFoundException('Joueur introuvable');
    }
    this.users.splice(index, 1);
  }

  // Modifie un joueur existant
  public update(id: number, user: UserModel): UserModel {
    const index: number = this.users.findIndex((user) => user.id === id);
    // Pas de joueur correspondant
    if (index === -1) {
      throw new NotFoundException('Joueur introuvable');
    }
    // Mise à jour du joueur
    const updtUser: UserModel = {
      ...user,
      id,
    };
    this.users[index] = updtUser;
    return updtUser;
  }

}
