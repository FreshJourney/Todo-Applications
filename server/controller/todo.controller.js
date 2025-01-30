const Todo = require("../model/todo.model");

const CreateTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id,
  });
  try {
    const newTodo = await todo.save();
    return res
      .status(201)
      .json({ message: "Todo Created Sucessfully", newTodo });
  } catch (error) {
    return res.status(400).json({ message: "Error Occured in Todo Creation" });
  }
};

const GetTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    return res.status(201).json({ message: "Todo Fetched Sucessfully", todos });
  } catch (error) {
    return res.status(400).json({ message: "Error Occured in GetTodos" });
  }
};

const UpdateTodos = async (req, res) => {
  try {
    const todos = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).json({ message: "Todo Updated Sucessfully", todos });
  } catch (error) {
    return res.status(400).json({ message: "Error Occured in UpdateTodos" });
  }
};

const DeleteTodos = async (req, res) => {
  try {
    const todos = await Todo.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Todo Deleted Sucessfully", todos });
  } catch (error) {
    return res.status(400).json({ message: "Error Occured in DeleteTodos" });
  }
};

module.exports = { CreateTodo, GetTodos, UpdateTodos, DeleteTodos };
