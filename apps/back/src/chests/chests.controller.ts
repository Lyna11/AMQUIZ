import { Controller, Get } from '@nestjs/common';

@Controller('chests')
export class ChestsController {
  @f  ()
  testMessage(): string {
    return 'Endpoint fonctionne correctement';
  }
}
