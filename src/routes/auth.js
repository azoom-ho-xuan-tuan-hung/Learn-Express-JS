import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        const result = await prisma.user.findUnique({
            where: { id: user.id }
        });

        if (!result) {
            return res.status(500).json({ message: 'User creation failed' });
        }
        // Add todo sample data for the new user
        await prisma.todo.create({
            data: {
                userId: result.id,
                title: 'Sample Todo',
                description: 'This is a sample todo item.',
                completed: false
            }
        });

        // Create a token
        const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(404).json({ message: 'User is not found' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;