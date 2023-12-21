/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuizzService } from '../quizz/quizz.service';
import { QuizzModel } from '../quizz/quizz.interface';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get()
  public findAll(): Array<QuizzModel> {
    return this.quizzService.findAll();
  }

  // /!\ @PARAM TOUJOURS EN STRING DONC CONVERTIR SI (ici 'ID') NUMERIQUE DANS INTERFACE /!\
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): QuizzModel {
    return this.quizzService.findOne(id);
  }
}
