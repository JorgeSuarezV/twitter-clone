import { ChatService } from "@domains/chat/service/chat.service";
import { CreateRoomDTO, ExtendedRoomDTO, MessageDTO, MessageResponseDTO, RoomDTO } from "@domains/chat/dto";
import { ChatRepository } from "@domains/chat/repository";
import { ForbiddenException, NotFoundException } from "@utils";
import { FollowRepository } from "@domains/follow/repository";

export class ChatServiceImpl implements ChatService {

  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly followRepository: FollowRepository
    ) {
  }

  async sendMessage(data: MessageDTO, userId: string): Promise<MessageResponseDTO> {
    const room = await this.chatRepository.doesRoomExistWithUser(data.room_id, userId);
    if (!room) throw new NotFoundException("Room");
    return await this.chatRepository.saveMessage(data, userId);
  }

  async getPrivateRoom(userId: string, receiverId: string): Promise<ExtendedRoomDTO> {
    const room = await this.chatRepository.getPrivateRoomIfExists(userId, receiverId);
    if (room) return room;
    const following = await this.followRepository.findFollowRelation(userId, receiverId);
    if (!following) throw new ForbiddenException();
    return await this.chatRepository.createPrivateRoom(userId, receiverId);
  }

  async createGroupRoom(data: CreateRoomDTO, userId: string): Promise<ExtendedRoomDTO> {
    const followRelations = await this.followRepository.findAllFollowRelations(userId, data.participantsIds);
    if (followRelations.length !== data.participantsIds.length) throw new ForbiddenException();
    return await this.chatRepository.createGroupRoom(data.description, data.name, data.participantsIds.concat(userId));
  }
}