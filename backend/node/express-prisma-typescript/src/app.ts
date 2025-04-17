import express from "express";
import {Constants, ErrorHandling, NodeEnv} from "@utils";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {router} from "@router";
import swaggerUi from "swagger-ui-express";
import {specs} from "@utils/swagger";
import {Server} from "socket.io";
import {ChatSocket} from "@domains/chat/socket/chat.socket";

export const app = express();

// Set up request logger
if (Constants.NODE_ENV === NodeEnv.DEV) {
    app.use(morgan("tiny")); // Log requests only in development environments
}

// Set up request parsers
app.use(express.json()); // Parses application/json payloads request bodies
app.use(express.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded request bodies
app.use(cookieParser()); // Parse cookies

// Set up CORS
app.use(
    cors({
        origin: Constants.CORS_WHITELIST
    })
);

app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(ErrorHandling);


export const server = require("http").createServer(app);
const io: Server = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true
    }
});

new ChatSocket().chatSocket(io.of("/chat"));