import { CreateRoomDTO, ExtendedRoomDTO, MessageDTO, MessageResponseDTO, RoomDTO } from "@domains/chat/dto";

export interface ChatService {
  sendMessage(data: MessageDTO, userId: string): Promise<MessageResponseDTO>
  getPrivateRoom(userId: string, receiverId: string): Promise<RoomDTO>;
  createGroupRoom(data: CreateRoomDTO, userId: string): Promise<ExtendedRoomDTO>;
}