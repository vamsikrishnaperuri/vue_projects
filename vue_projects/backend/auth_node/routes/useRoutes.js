// const {
//     authenticate,
//     handleSignup,
//     handleLogin,
//     handleGetMe,
//     handleUpdateMe,
//     handleDeleteMe,
// } = require("../controllers/userController")

// function parseBody(req){
//     return new Promise((resolve) =>{
//         let body ="";
//         req.on("data", (chunk)=> (body += chunk));
//         req.on("end", ()=>resolve(body));
//     });
// }

// async function userRoutes(req,res){
//     if(req.method === "POST" && req.url === "/api/signup"){
//         const body = parseBody(req);
//         return handleSignup(req, res, body);
//     }
//     else if(req.method === "POST" && req.url === "/api/login"){
//         const body = parseBody(req);
//         return handleLogin(req, res, body);
//     }else if(req.url === "/api/users/me"){
//         const userData = authenticate(req);
//         if(!userData){
//             res.writeHead(403, {"Content-Type": "application/json"});
//             return res.end(JSON.stringify({error: "Unauthorized"}));
//         }
//         if(req.method === "GET"){
//             return handleGetMe(req, res, userData);
//         }
//         if(req.method === "PUT"){
//             return handleUpdateMe(req, res, userData);
//         }
//         if(req.method === "DELETE"){
//             return handleDeleteMe(req, res, userData);
//         }
//     }

//     res.writeHead(404, {"Content-Type": "application/json"});
//     res.end(JSON.stringify({error: "Route not found"}));
// }
// module.exports = userRoutes;