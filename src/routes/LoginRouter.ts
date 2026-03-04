import { Hono } from "hono";
import { authController } from "../controllers/authController.js";

const app = new Hono();

app.post("/auth/login", async (c) => {
  const json = await c.req.json();
  const authorizationToken = c.req.header("Authorization");
  const { email, password } = json;

  const response = authController.getLoginDetails<string, string, string>(
    email,
    password,
    String(authorizationToken),
  );

  return c.json(JSON.stringify(response, null, 2));
});
