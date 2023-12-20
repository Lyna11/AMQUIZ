/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserModel } from './user.interface';

@Injectable()
export class UserService {
  // Liste des quizzs
  private users: UserModel[] = [];

  // Constructeur
  constructor() {
    this.fetchUsers();
  }

  // Méthode de vérification Users
  private async fetchUsers(): Promise<void> {
    if (this.users.length === 0) {
      await this.loadUsers();
    }
  }

  // Charge la collection des Users de Firebase
  private async loadUsers(): Promise<void> {
    try {
      const userCollection = await admin.firestore().collection('Users').get();
      userCollection.forEach((doc) => { 
        const userData = doc.data() as UserModel;
        this.users.push(userData);
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors du chargement des users');
    }
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
