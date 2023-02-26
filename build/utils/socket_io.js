"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketInit = void 0;
const socket_io_1 = require("socket.io");
const socketInit = (server) => {
    const corsConfig = { cors: {
            origin: '*',
            credentials: true,
        }
    };
    const io = new socket_io_1.Server(server, corsConfig);
    var global;
    global.onlineUsers = {};
    //   if (typeof global !== 'undefined') {
    //     global.onlineUsers = {};
    //   } else {
    //     throw new Error('Unable to create onlineUsers object.');
    //   }
    io.on('connection', (socket) => {
        global.chatSocket = socket;
        socket.on('add-user', (userId) => {
            global.onlineUsers[userId] = socket.id;
            io.emit('receive-online-users', Object.keys(global.onlineUsers));
        });
        socket.on('send-msg', (data) => {
            const receiver = global.onlineUsers[data.to];
            if (receiver) {
                socket
                    .to(receiver)
                    .emit('msg-receive', { from: data.from, msg: data.msg });
            }
        });
        socket.on('logout', (userId) => {
            delete global.onlineUsers[userId];
            io.emit('receive-online-users', Object.keys(global.onlineUsers));
        });
        socket.on('remove-user', (userId) => {
            delete global.onlineUsers[userId];
        });
    });
};
exports.socketInit = socketInit;
