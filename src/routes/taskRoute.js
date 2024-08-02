import { Router } from 'express';
import {
  getAllTasks,
  addTask,
  updateTask,
  editTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', addTask);
router.patch('/tasks/:id', updateTask);
router.put('/tasks/:id', editTask);
router.delete('/tasks/:id', deleteTask);

export default router;
