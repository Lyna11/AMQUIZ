/* eslint-disable prettier/prettier */
import { Controller, Get, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { QuizzModel } from './quizz.interface';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get()
  public findAll(): Array<QuizzModel> {
    console.log('[QUIZZ] - findAll()');
    return this.quizzService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): QuizzModel {
    console.log("[QUIZZ] - findOne()");
    return this.quizzService.findOne(id);
  }

  @Put(':id')
  public create(quizz: QuizzModel): QuizzModel {
    console.log('[QUIZZ] - create()');
    return this.quizzService.create(quizz);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    console.log('[QUIZZ] - delete()');
    this.quizzService.delete(id);
  }

  @Put(':id')
  public update(@Param('id', ParseIntPipe) id: number, quizz: QuizzModel): QuizzModel {
    console.log('[QUIZZ] - update()');
    return this.quizzService.update(id, quizz);
  }
}
