import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { pool } from "./db/databaseInitialization.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/create-table", async (c) => {
  await pool.query(`
    CREATE TABLE pathZenStudents (
      student_id INT AUTO_INCREMENT PRIMARY KEY,
      student_email_id VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);

  return c.json({ message: "TABLE CREATED SUCCESSFULLY" });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
