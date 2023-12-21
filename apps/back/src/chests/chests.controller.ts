import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';

@Controller('chests')
export class ChestsController {
  @Get()
  @UseGuards(FirebaseAuthGuard)
  testMessage(): string {
    return 'Endpoint fonctionne correctement';
  }
}
