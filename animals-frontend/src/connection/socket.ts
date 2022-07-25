import io from "socket.io-client";

let URL = "";

switch (process.env.NODE_ENV) {
  case "production":
    URL = "https://www.superfarmer.io";
    break;
  case "development":
    URL = "http://localhost:3000";
    break;
  case "test":
    URL = "http://localhost:3000";
    break;
  default:
    URL = "https://www.superfarmer.io";
}

const socket = io(URL);

export default socket;
