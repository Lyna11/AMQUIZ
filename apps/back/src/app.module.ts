/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizzModule } from './quizz/quizz.module';
import { QuestionsModule } from './questions/questions.module';
import { UserModule } from './user/user.module';
import { QuizzController } from './quizz/quizz.controller';

@Module({
  imports: [QuizzModule, QuestionsModule, UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [QuizzController],
  providers: [],
})
export class AppModule { }
