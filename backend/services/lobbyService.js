import { Manager } from "socket.io-client";

const manager = new Manager("https://example.com", {
  autoConnect: false,
});

const socket = manager.socket("/");

manager.open((err) => {
  if (err) {
    // an error has occurred
  } else {
    // the connection was successfully established
  }
});
