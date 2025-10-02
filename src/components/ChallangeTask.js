import React, { useState, useEffect } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from localStorage on first render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage whenever "tasks" changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div>
      <h2>📌 Persistent Todo App</h2>
      <input
        type="text"
        value={newTask}
        placeholder="Enter task"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {tasks.map((task, i) => (
            <li key={i} style={{ textDecoration: task.done ? "line-through" : "none" }}>
              {task.text}
              <button onClick={() => toggleTask(i)}>
                {task.done ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
