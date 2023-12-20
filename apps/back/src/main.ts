/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import Firebase
import * as admin from 'firebase-admin';

async function bootstrap() {
  const serviceAccount = require('/Users/felixchab/Documents/Git/AMQUIZ/amquiz-react-firebase-adminsdk-4yw63-b2004ca0b6.json');
  
  // Firebase Admin App
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL,
  });
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT);
  console.log("Listening on port " + process.env.API_PORT);
  app.enableCors();
}
bootstrap();
