import { ExtendedRoomDTO, MessageDTO, MessageResponseDTO, RoomDTO } from "@domains/chat/dto";

export interface ChatRepository {
  getRoomsByUserId(userId: string): Promise<RoomDTO[]>;
  doesRoomExistWithUser(roomId: string, userId: string): Promise<boolean>;
  saveMessage(data: MessageDTO, userId: string): Promise<MessageResponseDTO>;
  getPrivateRoomIfExists(userId: string, receiverId: string): Promise<ExtendedRoomDTO | null>;
  createPrivateRoom(userId: string, receiverId: string): Promise<ExtendedRoomDTO>;
  createGroupRoom(description: string | undefined, name: string, participantsIds: string[]): Promise<ExtendedRoomDTO>;
}