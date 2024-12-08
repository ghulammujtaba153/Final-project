const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    console.log(userId, socketId);

    removeUserByUserId(userId);

    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUserByUserId = (userId) => {
    users = users.filter((user) => user.userId !== userId);
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    console.log("a user connected.");
  
    //take userId and socketId
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
        const user = getUser(receiverId);
        console.log(senderId, receiverId, content);
        console.log(user);
      
        if (user) {
            console.log(user);
          io.to(user.socketId).emit("getMessage", {
            senderId,
            content,
          });
          console.log("messages sent");
        } else {
          console.error(`User with ID ${receiverId} not found in the connected users.`);
        }
      });

    //send notification
    socket.on("sendNotification", ({_id, receiverId, title, message, link }) => {
      const user = getUser(receiverId);
      console.log(receiverId, title, message, link);
      console.log(user);
    
      if (user) {
          console.log(user);
        io.to(user.socketId).emit("getNotification", {
          _id,receiverId, title, message, link
        });
        console.log("notification sent");
      } else {
        console.error(`User with ID ${receiverId} not found in the connected users.`);
      }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
    //   console.log(getUsers());
      io.emit("getUsers", users);
    });
  });