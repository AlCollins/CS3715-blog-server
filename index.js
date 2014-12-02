var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/main.html"] = requestHandlers.start;
handle["/events/event"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/posts.json"] = requestHandlers.fileHandler;
handle["/events/event.js"] = requestHandlers.fileHandler;
handle["/events/event.html"] = requestHandlers.start;
handle["/main.css"] = requestHandlers.fileHandler;
handle["/main-mobile.css"] = requestHandlers.fileHandler;
handle["/img/al_50.jpg"] = requestHandlers.fileHandler;
handle["/img/myles_50.jpg"] = requestHandlers.fileHandler;
handle["/events/event.css"] = requestHandlers.fileHandler;
handle["/img/robFord_250.jpg"] = requestHandlers.fileHandler;
handle["/img/robFordAClassyGuy_250.jpg"] = requestHandlers.fileHandler;
handle["/img/ford_250.jpg"] = requestHandlers.fileHandler;
handle["/img/al.jpg"] = requestHandlers.fileHandler;
handle["/profiles/al.html"] = requestHandlers.fileHandler;
handle["/profiles/myles.html"] = requestHandlers.fileHandler;
handle["/img/myles.jpg"] = requestHandlers.fileHandler;
handle["/events/event-mobile.css"] = requestHandlers.fileHandler;

server.start(router.route, handle);