/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { ConfigService } from '@nestjs/config';

// Import Firebase
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  // Pas très clean mais méthode la plus simple
  //const configService = new ConfigService();

  // Config Firebase
  const adminConfig: ServiceAccount = {
    projectId: process.env.PROJECTID,
    privateKey: process.env.FIREBASE_API_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  // Firebase Admin App
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.FIREBASE_URL,
  });
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT);
  console.log("Listening on port " + process.env.API_PORT);
  app.enableCors();
}
bootstrap();
