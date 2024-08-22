import EditTodoForm from "./EditTodoForm";

type InitialTodo = {
  todoId: number;
  title: string;
  isEditing: boolean;
  isCompleted: boolean;
};

type TodoProps = {
  todo: InitialTodo;
  deleteTodo: (id: number) => void;
  checkTodo: (id: number) => void;
  toggleEditTodo: (id: number) => void;
  editTodoVal: (val: string, id: number) => void;
};

const Todo = ({
  todo,
  deleteTodo,
  checkTodo,
  toggleEditTodo,
  editTodoVal,
}: TodoProps) => {
  return (
    <li className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          className="w-4 h-4 text-blue-600 rounded-lg focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-300 border-gray-500"
          onChange={() => checkTodo(todo.todoId)}
        />
        {todo.isEditing ? (
          <EditTodoForm todo={todo} editTodoVal={editTodoVal} />
        ) : (
          <p
            className={`${
              todo.isCompleted
                ? "w-[180px] line-through text-gray-400"
                : "w-[180px]"
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>
      <div className="space-x-2 flex gap-0">
        {!todo.isEditing && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg transition ml-3"
            onClick={() => toggleEditTodo(todo.todoId)}
          >
            Edit
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
          onClick={() => deleteTodo(todo.todoId)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
