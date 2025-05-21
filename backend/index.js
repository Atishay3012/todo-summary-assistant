require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const Todo = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// REST API Endpoints

// GET /todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST /todos
app.post('/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// POST /summarize
app.post('/summarize', async (req, res) => {
  const todos = await Todo.find({ is_completed: false });
  const todoTexts = todos.map(t => t.text).join('\n');
  const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Summarize these pending to-dos.' },
      { role: 'user', content: todoTexts }
    ]
  });
  const summary = completion.data.choices[0].message.content;
  await axios.post(process.env.SLACK_WEBHOOK, { text: summary });
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
