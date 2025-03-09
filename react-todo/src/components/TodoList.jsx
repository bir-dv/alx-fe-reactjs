import { useState } from "react";

const initialTodos = [
    {
        id:1,
        text: "Join ALX",
        completed: false
    },
    {
        id:2,
        text: "Study React",
        completed: true
    },
    {
        id:3,
        text: "Build Projects",
        completed: false
    }
]

const TodoList = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState("");

    //to add new todo
    const addTodo = () => {
        if (newTodo.trim() === "") return; // this to privent adding empity todo to the list.
        setTodos([...todos, {id:Date.now(), text: newTodo, completed: false}]);
        setNewTodo("");
    }

    //to delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    //to toggle todo
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-xl font-bold mb-4">Todo List</h1>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="border p-2 flex-grow rounded"
              placeholder="Add a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              className="bg-blue-500 text-emerald-800 px-4 py-2 rounded"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-2 border-b cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      );


}

export default TodoList;