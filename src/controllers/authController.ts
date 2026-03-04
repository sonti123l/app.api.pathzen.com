import { insertCommandForStudentsTable } from "../config/dbCommands.js";
import { HTTP_MESSAGES } from "../constants/httpMessages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "pathzen_super_secret";

class AuthController {
  async getLoginDetails<
    T extends string,
    V extends string,
    K extends string | undefined,
  >(email: T, password: V, authorizationToken: K) {
    const emailRegex =
      /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

    if (!email && !password) {
      return {
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: HTTP_MESSAGES.UNPROCESSABLE_CONTENT,
        values: "Expected email and password but got undefined",
        data: [email, password],
      };
    }

    if (email && emailRegex.test(email) && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await insertCommandForStudentsTable({
        studentName: "Sonti Sai trishal",
        studentEmail: email,
        studentPassword: hashedPassword,
        studentRollNo: "21481A05L1",
      });

      const token = jwt.sign(
        {
          email: email,
          role: "student",
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        },
      );

      return {
        status: HTTP_STATUS.OK,
        message: HTTP_MESSAGES.OK,
        values: "Login Successful",
        accessToken: token,
        data: result,
      };
    }
  }
}

export const authController = new AuthController();
