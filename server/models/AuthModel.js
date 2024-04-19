import pool from "../config/db.js";

export const getUserByEmail = async (email) => {
  if (!email) {
    return null;
  }

  try {
    const authenticated = await pool.query(
      "SELECT * from user WHERE u_email = ? AND u_deleted_status = 0 AND u_status = 1",
      [email]
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
