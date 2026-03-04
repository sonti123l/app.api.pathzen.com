import { pool } from "../db/databaseInitialization.js";
import type { StudentData } from "../helpers/interfaces/dbTypes.js";

export const insertCommandForStudentsTable = async ({
  studentName,
  studentEmail,
  studentPassword,
  studentRollNo,
}: StudentData) => {
  const query = `INSERT INTO student_table (student_name, student-mail, student_rollno, student_password) VALUES (?, ?, ?, ?)`;
  const result = await pool.query(query, [
    studentName,
    studentEmail,
    studentPassword,
    studentRollNo,
  ]);

  return result;
};
