const { signup, login, getUser, updateUser, deleteUser } = require("../services/userService");
const { verifyToken } = require("../utils/auth");

function authenticate(req){
    const authHeader = req.headers["authorization"];
    if(!authHeader) return null;
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
}

async function handleSignup(req, res, body){
    try{
        const {name, email, password} = JSON.parse(body);
        const result = await signup(name, email, password);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }catch(err){
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

async function handleLogin(req, res, body){
    try{
        const {email, password} = JSON.parse(body);
        const result = await login(email, password);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }catch(err){
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

async function handleGetMe(req, res, userData){
    try{
        const result = await getUser(userData.id);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }catch(err){
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

async function handleUpdateMe(req, res, body, userData){
    try{
        const {name, email, phone, lastname, gender} = JSON.parse(body);
        const result = await updateUser(userData.id, name, email, phone, lastname, gender);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }catch(err){
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}
async function handleDeleteMe(req, res, userData){
    try{
        const result = await deleteUser(userData.id);
        console.log(result);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    }catch(err){
        console.log(err)
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

module.exports = {
  authenticate,
  handleSignup,
  handleLogin,
  handleGetMe,
  handleUpdateMe,
  handleDeleteMe,
};
