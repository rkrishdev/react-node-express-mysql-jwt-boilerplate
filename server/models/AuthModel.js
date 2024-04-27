import pool from "../config/db.js";

export const getUserByEmail = async (email, role) => {
  if (!email || !role) {
    return null;
  }

  try {
    const authenticated = await pool.query(
      "SELECT * from user WHERE u_email = ? AND u_role = ? AND u_deleted_status = 0 AND u_status = 1",
      [email, role]
    );
    const [rows] = authenticated;

    if (Object.keys(rows).length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    return null;
  }
};

export const getUserByUserId = async (refId) => {
  if (!refId) {
    return null;
  }

  try {
    const authenticated = await pool.query(
      "SELECT * from user WHERE u_user_id = ? AND u_deleted_status = 0 AND u_status = 1",
      [refId]
    );
    const [rows] = authenticated;

    if (Object.keys(rows).length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    return null;
  }
};
