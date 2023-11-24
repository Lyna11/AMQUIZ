import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Import Firebase
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Config Firebase
  const config: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: config.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: config
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  // Init Firebase Admin App
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://xxxxxxxxx.firebaseio.com', // URL Firestore (real-time)
  });
  await app.listen(config.get<string>('API_PORT') || 4000);
  app.enableCors();
}
bootstrap();
