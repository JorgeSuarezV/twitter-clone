import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  room_id: string;

  constructor(message: MessageDTO) {
    this.message = message.message;
    this.room_id = message.room_id;
  }
}

export class MessageResponseDTO {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  createdAt: Date;

  constructor(messageResponse: MessageResponseDTO) {
    this.id = messageResponse.id;
    this.content = messageResponse.content;
    this.roomId = messageResponse.roomId;
    this.senderId = messageResponse.senderId;
    this.createdAt = messageResponse.createdAt;
  }
}

export class RoomDTO {
  id: string;
  name: string;
  userId?: string;
  image: string;
  type: string;
  lastMessage?: MessageResponseDTO;


  constructor(room: RoomDTO) {
    this.id = room.id;
    this.type = room.type;
    this.name = room.name;
    this.lastMessage = room.lastMessage;
    this.image = room.image;
    this.userId = room.userId;
  }
}

export class ExtendedRoomDTO extends RoomDTO {
  users: UserDTO[];
  messages: MessageResponseDTO[];

  constructor(room: ExtendedRoomDTO) {
    super(room);
    this.users = room.users;
    this.messages = room.messages;
  }
}

class UserDTO {
  id: string;
  name: string;

  constructor(user: UserDTO) {
    this.id = user.id;
    this.name = user.name;
  }
}

export class CreateRoomDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  participantsIds: string[];

  description?: string;

  constructor(room: CreateRoomDTO) {
    this.name = room.name;
    this.participantsIds = room.participantsIds;
    this.description = room.description;
  }
}