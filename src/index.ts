import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRouter } from "./routes/authRouter.js";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("PathZen API is running!"));

app.route("/", authRouter);

serve(
  {
    fetch: app.fetch,
    port: 5757,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
