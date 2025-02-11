const express = require("express");
const router = express.Router();
const TodoController = require("../controller/todo.controller.js");
const { aunthenticate } = require("../middleware/authorize.js");
const {
  rateLimiterCreate,
  rateLimiterDelete,
} = require("../middleware/rateLimiter2.js");

router.post(
  "/create",
  aunthenticate,
  rateLimiterCreate,
  TodoController.CreateTodo
);
router.get("/fetch", aunthenticate, TodoController.GetTodos);
router.put("/update/:id", aunthenticate, TodoController.UpdateTodos);
router.delete(
  "/delete/:id",
  aunthenticate,
  rateLimiterDelete,
  TodoController.DeleteTodos
);

module.exports = router;
