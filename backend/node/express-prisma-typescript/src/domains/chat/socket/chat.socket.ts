import {db, socketErrorHandling, verifySchema, verifyToken} from "@utils";
import {ChatService, ChatServiceImpl} from "@domains/chat/service";
import {ChatRepository, ChatRepositoryImpl} from "@domains/chat/repository";
import {CreateRoomDTO, MessageDTO} from "@domains/chat/dto";
import {FollowRepositoryImpl} from "@domains/follow/repository";

export class ChatSocket {
  chatRepository: ChatRepository = new ChatRepositoryImpl(db);
  chatService: ChatService = new ChatServiceImpl(this.chatRepository, new FollowRepositoryImpl(db));


  chatSocket = (io: any) => {
    io.use(async (socket: any, next: any) => {
      socket.errorHandler = socketErrorHandling;
      try {
        verifyToken(socket);
      } catch (error) {
        socket.errorHandler(error, socket);
        socket.disconnect();
      }
      next();
    });

    io.on("connection", async (socket: any) => {
      io.emit("hello", "hello");
      socket.on("join", async () => {
        try {
          const rooms = await this.chatRepository.getRoomsByUserId(socket.user.userId);
          socket.join(rooms.map((room) => room.id));
          socket.emit("join", { rooms: rooms });
        } catch (error) {
          socket.errorHandler(error, socket);
        }
      });

      socket.on("send.message", async (data: MessageDTO) => {
        try {
          await verifySchema(data, MessageDTO);
          const message = await this.chatService.sendMessage(data, socket.user.userId);
          io.to(message.roomId).emit("message", message);
        } catch (error) {
          socket.errorHandler(error, socket);
        }
      });

      socket.on("get.private.room", async (data: any) => {
        try {
          const room = await this.chatService.getPrivateRoom(socket.user.userId, data);
          socket.join(room.id);
          socket.emit("join.room", room);
        } catch (error) {
          socket.errorHandler(error, socket);
        }
      });

      socket.on("create.group.room", async (data: CreateRoomDTO) => {
        try {
          await verifySchema(data, CreateRoomDTO);
          const room = await this.chatService.createGroupRoom(data, socket.user.userId);
          socket.join(room.id);
          socket.emit("join.room", room);
        } catch (error) {
          socket.errorHandler(error, socket);
        }
      });
    });
  };


}
