import mongoose from 'mongoose';

const { model } = mongoose;

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = model('User', taskSchema);

export { Task };
