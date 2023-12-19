/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firestore = admin.firestore();

  // Récupère tous les documents Firebase
  async getAllDocuments(collectionPath: string) {
    const snapshot = await this.firestore.collection(collectionPath).get();
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  }

  // Récupère document firebase par ID
  async getDocumentById(collectionPath: string, docId: string) {
    const docRef = this.firestore.collection(collectionPath).doc(docId);
    const doc = await docRef.get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  }

}
