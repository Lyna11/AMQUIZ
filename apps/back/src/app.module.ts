/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizzModule } from './quizz/quizz.module';
import { QuestionsModule } from './questions/questions.module';
import { PlayerModule } from './player/player.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    QuizzModule,
    QuestionsModule,
    PlayerModule,
    EventsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
