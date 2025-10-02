import React, {useState, useEffect} from "react";

function TodoApp(){

    const [tasks, setTasks] = useState(() => {
        const saveTasks = localStorage.getItem("tasks");
        return saveTasks ? JSON.parse(saveTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if(newTask.trim() === "")return;
        setTasks([...tasks, {text: newTask, done: false}]);
        setNewTask("");
    }

    const deleteTask = (index) => {
        const updateTask = tasks.filter((_, i) => i !== index);
        setTasks(updateTask);
    }

    const toggleTask = (index) => {
        const updated = [...tasks];
        updated[index].done = !updated[index].done;
        setTasks(updated);
    };

    return (
        <div>
            <h3>Challange Task</h3>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter task" />
            <button onClick={addTask}>Add Task</button>
            {tasks.lengt === 0 ? 
                <p>not any yet</p>    
            :
            <ul>
                {tasks.map((task, i) => (
                    <li key={i}  className={task.done ? "done" : ""}> 
                        {task.text}
                        <button onClick={() => toggleTask(i)}>{task.done ? "Undo" : "Done"}</button>
                        <button onClick={() => deleteTask(i)}> X </button>
                    </li>
                ))}
            </ul>
            }
        </div>
    )
}

export default TodoApp;