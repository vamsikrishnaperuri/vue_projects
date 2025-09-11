const { getUserLogs } = require("../services/logsService");
const url = require("url");

async function handleGetUserLogs(req, res, userData) {
  try {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    console.log("entered logcontroller");

    const filters = {
      page: parseInt(query.page, 10) || 1,
      limit: parseInt(query.limit, 10) || 10,
      sortBy: query.sortBy || "logged_at",
      sortOrder: query.sortOrder || "desc",
      search: query.search || "",
      action: query.action || "",
      startDate: query.startDate || "",
      endDate: query.endDate || ""
    };

    const result = await getUserLogs(userData.id, filters);
    console.log("end logcontroller")
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (err) {
    console.error("handleGetUserLogs error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
}

module.exports = { handleGetUserLogs };
