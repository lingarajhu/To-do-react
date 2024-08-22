import { useState, useRef, useEffect } from "react";

type InitialTodo = {
  todoId: number;
  title: string;
  isEditing: boolean;
  isCompleted: boolean;
};

type EditTodoFormProps = {
  todo: InitialTodo;
  editTodoVal: (val: string, id: number) => void;
};

const EditTodoForm = ({ todo, editTodoVal }: EditTodoFormProps) => {
  const [val, setVal] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todo.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [todo.isEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodoVal(val, todo.todoId);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 gap-1 items-center justify-between"
    >
      <input
        value={val}
        type="text"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Update task"
        ref={inputRef}
        className="bg-transparent p-1 text-white rounded-md border-none focus:outline-none focus:right-1 focus:ring-blue-500 "
      />
      <button
        className="bg-green-500 hover:bg-green-600 mr-2 text-white font-bold py-1 px-3 rounded-lg transition ml-1"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default EditTodoForm;
