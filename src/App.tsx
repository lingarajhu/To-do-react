import "./App.css";
import TodoForm from "./TodoForm";

function App() {
  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg">
      <div className="w-96">
        <TodoForm />
      </div>
    </div>
  );
}

export default App;
