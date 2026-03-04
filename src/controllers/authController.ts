import {
  insertCommandForStudentsTable,
  findStudentByEmail,
} from "../config/dbCommands.js";
import { HTTP_MESSAGES } from "../constants/httpMessages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "pathzen_super_secret";

const emailRegex =
  /^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

class AuthController {
  async login(email: string, password: string) {
    if (!email || !password) {
      return {
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: HTTP_MESSAGES.UNPROCESSABLE_CONTENT,
        values: "Email and password are required",
      };
    }

    if (!emailRegex.test(email)) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: HTTP_MESSAGES.BAD_REQUEST,
        values: "Invalid email format",
      };
    }

    const student = await findStudentByEmail(email);

    if (!student) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: HTTP_MESSAGES.NOT_FOUND,
        values: "No account found with this email",
      };
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.student_password,
    );

    if (!passwordMatch) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: HTTP_MESSAGES.UNAUTHORIZED,
        values: "Incorrect password",
      };
    }

    const token = jwt.sign(
      { email, role: "student", rollNo: student.student_rollno },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    return {
      status: HTTP_STATUS.OK,
      message: HTTP_MESSAGES.OK,
      values: "Login successful",
      accessToken: token,
      data: {
        user_name: student.student_name,
        user_email: student.student_mail,
        user_roll_no: student.student_rollno,
      },
    };
  }

  async register(
    name: string,
    email: string,
    password: string,
    rollNo: string,
  ) {
    if (!name || !email || !password || !rollNo) {
      return {
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: HTTP_MESSAGES.UNPROCESSABLE_CONTENT,
        values: "Name, email, password and roll number are required",
      };
    }

    if (!emailRegex.test(email)) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: HTTP_MESSAGES.BAD_REQUEST,
        values: "Invalid email format",
      };
    }

    const existing = await findStudentByEmail(email);
    if (existing) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: HTTP_MESSAGES.CONFLICT,
        values: "An account with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await insertCommandForStudentsTable({
      studentName: name,
      studentEmail: email,
      studentPassword: hashedPassword,
      studentRollNo: rollNo,
    });

    const token = jwt.sign({ email, role: "student", rollNo }, JWT_SECRET, {
      expiresIn: "30d",
    });

    return {
      status: HTTP_STATUS.CREATED,
      message: HTTP_MESSAGES.CREATED,
      values: "Account created successfully",
      accessToken: token,
    };
  }
}

export const authController = new AuthController();
