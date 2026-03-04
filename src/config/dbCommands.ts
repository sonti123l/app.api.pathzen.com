import { pool } from "../db/databaseInitialization.js";
import type { StudentData } from "../helpers/interfaces/dbTypes.js";

export const insertCommandForStudentsTable = async ({
  studentName,
  studentEmail,
  studentPassword,
  studentRollNo,
}: StudentData) => {
  const query = `INSERT INTO student_table (student_name, student_mail, student_rollno, student_password) VALUES (?, ?, ?, ?)`;
  const result = await pool.query(query, [
    studentName,
    studentEmail,
    studentRollNo,
    studentPassword,
  ]);

  return result;
};

export const findStudentByEmail = async (email: string) => {
  const query = `SELECT * FROM student_table WHERE student_mail = ? LIMIT 1`;
  const [rows] = await pool.query(query, [email]);
  return (rows as any[])[0] ?? null;
};
