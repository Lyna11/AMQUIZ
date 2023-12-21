import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// import { QuizzService } from 'src/quizz/quizz.service';

interface Room {
  id: string;
  users: string[];
}

@Injectable()
class RoomManagerService {
  // constructor(@Inject(QuizzService) private quizzService: QuizzService) {}

  private rooms: Room[] = [];
  public readonly MAX_USERS_IN_ROOM = 2;

  findOrCreateRoom(username: string): Room {
    // this.quizzService.create
    let room = this.rooms.find((r) => r.users.length < this.MAX_USERS_IN_ROOM);

    if (!room) {
      // Créer une nouvelle room
      room = { id: uuid(), users: [] };
      this.rooms.push(room);
    }

    // Ajouter l'utilisateur à la room
    room.users.push(username);

    return room;
  }
}

export default RoomManagerService;
