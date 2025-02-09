import http from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import sqlite3 from "sqlite3";
const app = express();
const __dirname = process.cwd();

const swAllowedHostnames = ["localhost", "127.0.0.1", "plexilearcade.xyz"];  

const checkAllowedHost = (req, res, next) => {
  const requestedHost = req.get("Host");  
  if (swAllowedHostnames.includes(requestedHost)) {
    return next();  
  }
  res.status(403).send("Access Denied: Invalid Host");
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/games/", (req, res) => {
  res.sendFile("/public/games.html", { root: __dirname });
});

app.get("/apps/", (req, res) => {
  res.sendFile("/public/apps.html", { root: __dirname });
});

app.get("/search/", (req, res) => {
  res.sendFile("/public/search.html", { root: __dirname });
});

app.get("/proxy/", (req, res) => {
  res.sendFile("/public/proxy.html", { root: __dirname });
});

app.get("/links/", (req, res) => {
  res.sendFile("/public/links.html", { root: __dirname });
});

app.get("/settings/", (req, res) => {
  res.sendFile("/public/settings.html", { root: __dirname });
});

app.get("/embed/", (req, res) => {
  res.sendFile("/public/embed.html", { root: __dirname });
});

app.get("/termsofservice/", (req, res) => {
  res.sendFile("/public/termsofservice.html", { root: __dirname });
});

app.get("/privacypolicy/", (req, res) => {
  res.sendFile("/public/privacypolicy.html", { root: __dirname });
});

app.get('*', function(req, res){
  res.sendFile("/public/404.html", { root: __dirname });
});

const httpServer = http.createServer();
const bareServer = createBareServer("/bare/");

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    checkAllowedHost(req, res, () => {
      bareServer.routeRequest(req, res);
    });
  } else {
    app(req, res);  
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const port = 2100;

httpServer.on("listening", () => {
  console.log("HTTP server listening");
  console.log(`View your server at http://localhost:${port}`);
});

httpServer.listen({
  port: port,
});
