const express = require("express");
const router = express.Router();
const TodoController = require("../controller/todo.controller.js");
const { aunthenticate } = require("../middleware/authorize.js");
router.post("/create", aunthenticate, TodoController.CreateTodo);
router.get("/fetch", aunthenticate, TodoController.GetTodos);
router.put("/update/:id", aunthenticate, TodoController.UpdateTodos);
router.delete("/delete/:id", aunthenticate, TodoController.DeleteTodos);

module.exports = router;
