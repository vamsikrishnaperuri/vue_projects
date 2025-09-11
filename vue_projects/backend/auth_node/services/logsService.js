const db = require("../db");

async function getUserLogs(userId, { page, limit, sortBy, sortOrder, search, action, startDate, endDate }) {
  console.log("entered logservices")
  const offset = (page - 1) * limit;
  let params = [userId];
  let where = "WHERE ul.user_id = ?";

  if (search) {
    where += " AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (action) {
    where += " AND ul.action LIKE ?";
    params.push(`%${action}%`);
  }

  if (startDate) {
    where += " AND DATE(ul.logged_at) >= ?";
    params.push(startDate);
  }

  if (endDate) {
    where += " AND DATE(ul.logged_at) <= ?";
    params.push(endDate);
  }

  const sql = `
    SELECT ul.id, ul.user_id, ul.action, ul.logged_at,
           u.name as user_name, u.email as user_email
    FROM user_logs ul
    JOIN users u ON ul.user_id = u.id
    ${where}
    ORDER BY ${sortBy} ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) as total
    FROM user_logs ul
    JOIN users u ON ul.user_id = u.id
    ${where}
  `;

  console.log("SQL:", sql, [...params, limit, offset])
  console.log("CountSQL:", countSql, params)
  // ✅ only take rows, ignore metadata
  const [rows] = await db.query(sql, [...params, limit, offset]);
  const [countRows] = await db.query(countSql, params);

  return {
    data: rows,
    total: countRows[0].total,
    page,
    limit,
    totalPages: Math.ceil(countRows[0].total / limit)
  };
}

module.exports = { getUserLogs };
