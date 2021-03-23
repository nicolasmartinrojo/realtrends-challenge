import * as io from "socket.io";
import * as tmi from "tmi.js";

const server = new io.Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const updateStatus = () => {
  server.emit("message", {votes, products});
};
server.on("connection", (socket) => {
  socket.emit("ping", "pung");
  updateStatus();
  socket.on("reset", () => {
    votes = [];
    updateStatus();
  });

  socket.on("product", (chosenProduct: chosenProduct) => {
    const _products = products.map((prod) => {
      if (prod.option == chosenProduct.option) {
        return chosenProduct;
      } else {
        return prod;
      }
    });

    products = _products;
    votes = [];
    updateStatus();
  });
});

const client = new tmi.Client({
  connection: {reconnect: true},
  channels: ["redo_nico"],
});

client.connect();

interface Vote {
  user: string;
  vote: string;
  description: string;
}
interface IProduct {
  id?: string;
  title: string;
  thumbnail: string;
}

type chosenProduct = IProduct & {
  option: string;
};

let votes: Vote[] = [];

const defaultProducts: chosenProduct[] = [
  {
    thumbnail: "http://http2.mlstatic.com/D_917123-MLA40826644626_022020-I.jpg",
    option: "a",
    title: "Anteojos Lentes De Sol Vulk",
    id: "MLA839914795",
  },
  {
    thumbnail: "http://http2.mlstatic.com/D_757000-MLA42306546763_062020-O.jpg",
    option: "b",
    title: "Anteojos Lentes B + D Super Bold Readers.",
    id: "MLA863793687",
  },
];
let products = defaultProducts;
client.on("message", (channel, tags, message, self) => {
  const user = tags["display-name"] as string;
  const result = message.match(/!([A-Za-z])\s*(.*)?/);

  if (result) {
    votes.push({user, vote: result[1], description: result[2]});
  }

  updateStatus();
});
