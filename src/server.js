import express from 'express';
import path, { dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';
import authMiddleware from './middleware/auth.js';



const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(path.join(__dirname, '../public'));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auth
app.use('/auth', authRoutes)

// Todo
app.use('/todos', authMiddleware, todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});