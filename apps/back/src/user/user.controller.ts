/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public findAll(): Array<UserModel> {
    console.log('[USER] - findAll()');
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): UserModel {
    console.log('[USER] - findOne()');
    return this.userService.findOne(id);
  }

  // Renvoi vers la liste des coups spéciaux du joueur
  @Get(':id/skills')
  public findSkills(@Param('id', ParseIntPipe) id: number): UserModel {
    console.log('[USER] - findSkills()');
    // TODO: récupérer pouvoirs du joueur dont l'id est renseigné 
    return this.userService.findOne(id); // temporaire
  }

  @Put(':id')
  public create(user: UserModel): UserModel {
    console.log('[USER] - create()');
    return this.userService.create(user);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    console.log('[USER] - delete()');
    this.userService.delete(id);
  }

  @Put(':id')
  public update(@Param('id', ParseIntPipe) id: number, user: UserModel): UserModel {
    console.log('[PLAYER] - update()');
    return this.userService.update(id, user);
  }
}
