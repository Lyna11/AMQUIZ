import { Module } from '@nestjs/common';
import { QuizzModule } from './quizz/quizz.module';
import { QuestionsModule } from './questions/questions.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [QuizzModule, QuestionsModule, PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
