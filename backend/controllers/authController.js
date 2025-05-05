import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();   
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = async (user, userId) => {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await db.query('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [userId, token]);
    return token;
};


export const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [rows] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ id: rows.insertId, username });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(400).json({ error: 'User not found' });
        
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });
        
        const accessToken = generateAccessToken({ id: user.id, name: user.username });
        const refreshToken = await generateRefreshToken({ id: user.id, name: user.username }, user.id);
        
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    
    try {
        const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken]);
        if (rows.length === 0) return res.sendStatus(403);
        
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken({ id: user.id, name: user.name });
        
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error refreshing token' });
    }
};  

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    
    try {
        await db.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Error logging out' });
    }
};


