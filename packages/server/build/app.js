"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io");
var tmi = require("tmi.js");
var server = new io.Server(5000, {
    cors: {
        origin: "http://localhost:3000",
    },
});
var updateStatus = function () {
    server.emit("message", { votes: votes, products: products });
};
server.on("connection", function (socket) {
    socket.emit("ping", "pong");
    updateStatus();
    socket.on("reset", function () {
        votes = [];
        updateStatus();
    });
    socket.on("product", function (chosenProduct) {
        var _products = products.map(function (prod) {
            if (prod.option == chosenProduct.option) {
                return chosenProduct;
            }
            else {
                return prod;
            }
        });
        products = _products;
        votes = [];
        updateStatus();
    });
});
var client = new tmi.Client({
    connection: { reconnect: true },
    channels: ["redo_nico"],
});
client.connect();
var votes = [];
var defaultProducts = [
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
var products = defaultProducts;
client.on("message", function (channel, tags, message, self) {
    var user = tags["display-name"];
    var result = message.match(/!([A-Za-z])\s*(.*)?/);
    if (result) {
        votes.push({ user: user, vote: result[1], description: result[2] });
    }
    updateStatus();
});
//# sourceMappingURL=app.js.map