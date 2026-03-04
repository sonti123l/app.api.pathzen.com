import { Hono } from "hono";
import { authController } from "../controllers/authController.js";

const authRouter = new Hono();

authRouter.post("/auth/login", async (c) => {
  const json = await c.req.json();
  const authorizationToken = c.req.header("Authorization");
  const { email, password } = json;

  const response = await authController.getLoginDetails( 
    email,
    password,
    String(authorizationToken),
  );

  return c.json(response);
});

export { authRouter }; 