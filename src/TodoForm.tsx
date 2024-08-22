import { useEffect, useState } from "react";
import Todo from "./Todo";

type InitialTodo = {
  todoId: number;
  title: string;
  isEditing: boolean;
  isCompleted: boolean;
};

const TodoForm = () => {
  const [todos, setTodos] = useState<InitialTodo[]>([]);
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    const todoList = localStorage.getItem("todo");
    if (todoList) {
      try {
        const parseTodo = JSON.parse(todoList);
        setTodos(parseTodo);
      } catch (error) {
        console.error("Error parsing todos from the localStorage ", error);
        localStorage.removeItem("todo");
      }
    }
  }, []);

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };

  const updateToLocalStorage = (updateTasks: InitialTodo[]): void => {
    localStorage.setItem("todo", JSON.stringify(updateTasks));
    setTodos(updateTasks);
  };

  const addTodo = () => {
    if (todo.trim() === "") {
      alert("Please enter the valid task");
      return;
    }
    const newTodo = {
      todoId: Date.now(),
      title: todo,
      isEditing: false,
      isCompleted: false,
    };
    const updateTasks = [...todos, newTodo];
    updateToLocalStorage(updateTasks);
    setTodo("");
  };

  const deleteTodo = (id: number) => {
    const updateTodos = todos.filter((todo) => todo.todoId !== id);
    updateToLocalStorage(updateTodos);
  };

  const toggleEditTodo = (id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.todoId === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    updateToLocalStorage(updateTodos);
  };

  const checkTodo = (id: number) => {
    const updateTodos = todos.map((todo) => {
      if (todo.todoId === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    updateToLocalStorage(updateTodos);
  };

  const editTodoValue = (val: string, id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.todoId === id
        ? { ...todo, title: val, isEditing: !todo.isEditing }
        : todo
    );
    updateToLocalStorage(updateTodos);
  };

  return (
    <div className="w-full">
      <h1 className="text-  ṁbh2xl font-bold text-center mb-6">Todo List</h1>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter your task"
          onChange={setTitle}
          value={todo}
          className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="w-full mt-3 p-3 bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
      <div className="space-y-3">
        <ul className="flex flex-col gap-2 items-center justify-between p-2 rounded-lg">
          {todos.map((todo: InitialTodo) => {
            return (
              <Todo
                key={todo.todoId}
                todo={todo}
                deleteTodo={deleteTodo}
                checkTodo={checkTodo}
                toggleEditTodo={toggleEditTodo}
                editTodoVal={editTodoValue}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
