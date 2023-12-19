/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Import Firebase
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  // Pas très clean mais méthode la plus simple
  const configService = new ConfigService();

  // Config Firebase
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('PROJECTID'),
    privateKey: configService.get<string>('FIREBASE_API_PRIVATE_KEY'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  // Firebase Admin App
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: configService.get<string>('FIREBASE_URL'),
  });
  
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get<string>('API_PORT') || 3000);
  app.enableCors();
}
bootstrap();
