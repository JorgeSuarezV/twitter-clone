import * as socketio from 'socket.io';
import { Logger } from "@utils/logger";

export const socketErrors = (socket: socketio.Socket) => {
  socket.on('connect_error', (err) => {
    Logger.error(`connect_error due to ${err.message}`);
  })
}