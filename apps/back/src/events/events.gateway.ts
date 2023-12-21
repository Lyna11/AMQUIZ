import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket as RawSocket } from 'socket.io';
import RoomManagerService from './room.service';
import { Get } from '@nestjs/common';

export type ClientToServerEvents = {
  searchRoom: (payload: number) => void;
  playerSendResponse: (
    payload: number,
    callback: (score: number) => void,
  ) => void;
  setIndex: (payload: number, callback: (index: number) => void) => void;
};

// Recupere le premier parametre dans la definition des fonction
// ClientToServer (correspond aux donnees envoyees par le client)
type PayloadForEvent<T extends keyof ClientToServerEvents> = Parameters<
  ClientToServerEvents[T]
>[0];

type ResponseForEvent<T extends keyof ClientToServerEvents> = Parameters<
  ClientToServerEvents[T]
>[1] extends (response: infer U) => void
  ? U
  : void;

export type ServerToClientEvents = {
  playerJoined: () => void;
  nextQuestion: (status: { question: string; reponses: string[] }) => void;
  setIndex: (status: { index: number }) => void;
  roomStatusUpdated: (status: {
    players: string[];
    roomCurrentPlayers: number;
    roomMaxPlayers: number;
  }) => void;
};

export type SocketData = {
  score?: number;
  index?: number;
};

export type Socket = RawSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  unknown,
  SocketData
>;

@WebSocketGateway(4001, { cors: { origin: '*' } })
export class EventsGateway {
  constructor(private readonly roomManagerService: RoomManagerService) {}
  @Get('health')
  healthCheck(): string {
    return 'WebSocket server is running.';
  }

  @WebSocketServer()
  server: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    unknown,
    SocketData
  >;

  @SubscribeMessage('searchRoom')
  onSearchRoom(
    @MessageBody() payload: PayloadForEvent<'searchRoom'>,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('searchRoom', payload, client.id, client.handshake);

    // Logique pour rejoindre une room
    const room = this.roomManagerService.findOrCreateRoom(client.id);
    const roomKey = `room/${room.id}`;

    client.join(roomKey);

    this.server.to(roomKey).emit('roomStatusUpdated', {
      players: [],
      roomCurrentPlayers: 1,
      roomMaxPlayers: this.roomManagerService.MAX_USERS_IN_ROOM,
    });

    this.server.to(client.id).emit('playerJoined');

    if (room.users.length === this.roomManagerService.MAX_USERS_IN_ROOM) {
      this.server.to(roomKey).emit('nextQuestion', {
        question: 'slt',
        reponses: [],
      });
    }
  }

  @SubscribeMessage('playerSendResponse')
  onPlayerSendResponse(
    @MessageBody() payload: PayloadForEvent<'playerSendResponse'>,
    @ConnectedSocket() client: Socket,
  ): ResponseForEvent<'playerSendResponse'> {
    if (!client.data.score) {
      client.data.score = 0;
    }

    if (payload === +'idBonneReponse') {
      client.data.score += 5;
    } else {
      client.data.score -= 5;
    }
    this.server.to(client.rooms[0]).emit('nextQuestion', {
      question: 'slt',
      reponses: [],
    });
    return client.data.score;
  }

  @SubscribeMessage('setIndex')
  onSetIndex(
    @MessageBody() payload: PayloadForEvent<'setIndex'>,
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data.index) {
      client.data.index = 0;
    }

    console.log('setIndex', payload, client.id, client.handshake);
    client.data.index = payload;

    client.data.index += 1;

    this.server.to(client.rooms[0]).emit('setIndex', {
      index: client.data.index,
    });
    console.log('Current index:', client.data.index);
    return client.data.index;
  }

  // @SubscribeMessage('events')
  // handleEvent(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket,
  // ): string {
  //   console.log(client.id, client.handshake);
  //   return data;
  // }
}
