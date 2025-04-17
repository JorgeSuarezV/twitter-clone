import { ChatRepository } from "@domains/chat/repository/chat.repository";
import { ExtendedRoomDTO, MessageDTO, MessageResponseDTO, RoomDTO } from "@domains/chat/dto";
import { PrismaClient } from "@prisma/client";
import {createUserDTO} from "@domains/user/dto";

export class ChatRepositoryImpl implements ChatRepository {

  constructor(private readonly db: PrismaClient) {
  }

  async getRoomsByUserId(userId: string): Promise<RoomDTO[]> {
    const rooms = await this.db.room.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: {
          take: 2,
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc"
          },
          include: {
            user: true
          }
        },
        groupRoom: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return await Promise.all(rooms.map(async (room: any) => {
      room.lastMessage = room.messages[0] ? room.messages[0] : undefined;
      if (room.type === "DIRECT") {
        const user = room.users.find((user: any) => user.id !== userId);
        const activeUser = await createUserDTO(user);
        room.image = activeUser.profilePicture;
        room.userId = activeUser.id
        room.name = activeUser.name;
      } else {
        room.name = room.groupRoom.name;
        room.image = room.groupRoom.image;
      }
      return new RoomDTO(room);
    }))
  }

  async doesRoomExistWithUser(roomId: string, userId: string): Promise<boolean> {
    const room: any = await this.db.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: {
            id: userId
          }
        }
      }
    });
    return !!room;
  }

  async saveMessage(data: MessageDTO, userId: string): Promise<MessageResponseDTO> {
    const message = await this.db.message.create({
      data: {
        senderId: userId,
        content: data.message,
        roomId: data.room_id
      }
    });
    return new MessageResponseDTO(message);
  }

  async createPrivateRoom(userId: string, receiverId: string): Promise<ExtendedRoomDTO> {
    const room: any = await this.db.room.create({
      data: {
        type: "DIRECT",
        users: {
          connect: [
            {
              id: userId
            },
            {
              id: receiverId
            }
          ]
        }
      },
      include: {
        messages: true,
        users: true
      }
    });
    room.name = room.users.find((user: any) => user.id === receiverId).name;
    const activeUser = await createUserDTO(room.users.find((user: any) => user.id === receiverId))
    room.image = activeUser.profilePicture;
    room.userId = activeUser.id
    return new ExtendedRoomDTO(room);
  }

  async getPrivateRoomIfExists(userId: string, receiverId: string): Promise<ExtendedRoomDTO | null> {
    const room: any = await this.db.room.findFirst({
      where: {
        users: {
          every: {
            OR: [
              {
                id: userId
              },
              {
                id: receiverId
              }
            ]
          }
        },
        type: "DIRECT"
      },
      include: {
        users: true,
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    });
    if (!room) return null;
    const user = room.users.find((user: any) => user.id !== userId);
    const actualUser = await createUserDTO(user)
    room.name = actualUser.name;
    room.image = actualUser.profilePicture;
    return new ExtendedRoomDTO(room);
  }

  async createGroupRoom(description: string | undefined, name: string, participantsIds: string[]): Promise<ExtendedRoomDTO> {
    let room: any = await this.db.room.create({
      data: {
        type: "GROUP",
        groupRoom: {
          create: {
            name: name,
            description: description
          }
        },
        users: {
          connect: participantsIds.map((id: string) => {
            return {
              id: id
            };
          })
        }
      },
      include: {
        users: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    room.name = name;
    room.messages = [];
    return new ExtendedRoomDTO(room);
  }
}