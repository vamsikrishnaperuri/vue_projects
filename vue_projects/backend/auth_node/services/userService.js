const bcrypt = require("bcrypt");
const db = require("../db");
const { generateToken } = require("../utils/auth");

async function signup(name, email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        "INSERT into users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    );

    const user = {id: result.insertId, name, email};
    const token = generateToken(user);
    return {...user, token};
}

async function login(email, password){
    const [rows] = await db.query("SELECT * from users WHERE email = ?", [email]);
    if(rows.length === 0) throw new Error("User not found");

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Invalid credentials");
    await db.query("INSERT INTO user_logs (user_id) VALUES (?)", [user.id]);
    const token = generateToken(user);
    return {id: user.id, name: user.name, email: user.email, token};
}

async function getUser(id){
    const [rows] = await db.query("SELECT id, name, email, phone, lastname, gender FROM users WHERE id=?", [id]);
    if(rows.length === 0 ) throw new Error("User not found");
    return rows[0];
}

async function updateUser(id, name, email, phone, lastname, gender){
    await db.query("UPDATE users SET name=?, email=?, phone=?, lastname=?, gender=? WHERE id=?",[name, email, phone,lastname, gender, id]);
    return {id, name, email, phone, lastname, gender};
}

async function deleteUser(id){
    await db.query("DELETE FROM users WHERE id=?", [id]);
    return { message: "Account deleted successfully" };

}

module.exports = { signup, login, getUser, updateUser, deleteUser };