import { Module } from '@nestjs/common';
import { ChestsController } from './chests.controller';

@Module({
  controllers: [ChestsController],
})
export class ChestsModule {}
