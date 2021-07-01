const http = require("http");
const Koa = require("koa");
const Router = require("@koa/router");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const slow = require('koa-slow');
const { read } = require("fs");

const app = new Koa();

const data = [
  {
    timestamp: '15:33 01.01.2021',
    header: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    color: 'red',
  },
  {
    timestamp: '15:33 01.01.2021',
    header: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    color: 'yellow',
  },
  {
    timestamp: '15:33 01.01.2021',
    header: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    color: 'green',
  },
]

app.use(
  cors({
    origin: "*",
    credentials: true,
    "Access-Control-Allow-Origin": true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(slow({
  delay: 1000,
}))

app.use(koaBody({ json: true, text: true, urlencoded: true }));

const router = new Router();

router.get("/data", async (ctx) => {
  ctx.response.body = JSON.stringify(data);
  console.log(ctx.response)
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log("server started"));
