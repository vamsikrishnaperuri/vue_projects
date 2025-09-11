const http = require("http");
const url = require("url");
const {
  authenticate,
  handleSignup,
  handleLogin,
  handleGetMe,
  handleUpdateMe,
  handleDeleteMe,
} = require("./controllers/userController"); // adjust path if needed
const { handleGetUserLogs } = require("./controllers/logsController");

const PORT = 3001;

const server = http.createServer((req, res) => {
  console.log("server hit");
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Parse body for POST/PUT requests
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));

  req.on("end", async () => {
    try {

      if (req.url === '/api/healthcheck' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
      }

      // Signup
      if (req.method === "POST" && parsedUrl.pathname === "/api/signup") {
        await handleSignup(req, res, body);
        return;
      }

      // Login
      if (req.method === "POST" && parsedUrl.pathname === "/api/login") {
        await handleLogin(req, res, body);
        return;
      }

      // Protected /users/me routes
      if (parsedUrl.pathname === "/api/users/me") {
        const userData = authenticate(req);
        if (!userData) {
          res.writeHead(403);
          return res.end(JSON.stringify({ error: "Unauthorized" }));
        }

        if (req.method === "GET") {
          await handleGetMe(req, res, userData);
          return;
        }
        if (req.method === "PUT") {
          await handleUpdateMe(req, res, body, userData);
          return;
        }
        if (req.method === "DELETE") {
          await handleDeleteMe(req, res, userData);
          return;
        }
      }
      if (req.method === "GET" && pathname === "/api/logs") {
        console.log("start server.js log");
         const userData = authenticate(req);
         console.log("log auth completed");
        if (!userData) {
          res.writeHead(403);
          return res.end(JSON.stringify({ error: "Unauthorized" }));
        }
        console.log("calling handleGetUserLogs");
        await handleGetUserLogs(req, res, userData);
      }

    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
      console.log(err)
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
