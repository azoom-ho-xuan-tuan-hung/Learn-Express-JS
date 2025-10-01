import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: { userId: req.userId }
    });
    return res.json(todos);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
            userId: req.userId
        }
    });
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    return res.json(todo);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const newTodo = await prisma.todo.create({
            data: {
                userId: req.userId,
                title,
                description: description || '',
                completed: false
            }
        });
        return res.status(201).json(newTodo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todo = await prisma.todo.findFirst({
    where: {
      id: Number(id),
      userId: req.userId,
    },
  });
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const data = {};
  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (completed !== undefined) data.completed = completed;

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data,
    });
    return res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
            userId: req.userId
        }
    });
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    try {
        await prisma.todo.delete({
            where: {
                id: Number(id),
                userId: req.userId
            }
        });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;