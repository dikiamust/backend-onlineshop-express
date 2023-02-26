import { Server } from "socket.io";

interface Global {
  [key: string]: any;
}

export const socketInit = ( server: any) => {

  const corsConfig = { cors: { 
    origin: '*',
    credentials: true,
   }
  }

  const io = new Server(server, corsConfig);
  var global: Global
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

