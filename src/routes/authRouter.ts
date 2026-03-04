import { Hono } from "hono";
import { authController } from "../controllers/authController.js";

const authRouter = new Hono();

// POST /api/login
authRouter.post("/api/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const response = await authController.login(email, password);
    return c.json(response, response.status as any);
  } catch (err) {
    console.error("[POST /api/login]", err);
    return c.json({ status: 500, message: "Internal server error" }, 500);
  }
});

// POST /api/register
authRouter.post("/api/register", async (c) => {
  try {
    const { name, email, password, rollNo } = await c.req.json();
    const response = await authController.register(
      name,
      email,
      password,
      rollNo,
    );
    return c.json(response, response.status as any);
  } catch (err) {
    console.error("[POST /api/register]", err);
    return c.json({ status: 500, message: "Internal server error" }, 500);
  }
});

export { authRouter };
