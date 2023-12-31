/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizzModule } from './quizz/quizz.module';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { QuizzController } from './quizz/quizz.controller';
import { ChestsModule } from './chests/chests.module';
import {FirebaseAuthModule} from '@whitecloak/nestjs-passport-firebase';
//import { ChestsController } from './chests/chests.controller';
//import { ChestsService } from './chests/chests.service'


@Module({
  imports: [
    QuizzModule,
    QuestionsModule,
    //PlayerModule,
    //EventsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ChestsModule,
    FirebaseAuthModule.register({
      audience: 'amquiz-react',
      issuer: 'https://securetoken.google.com/amquiz-react',
  }),

  ],
  controllers: [],
  providers: [],  
})
export class AppModule {}