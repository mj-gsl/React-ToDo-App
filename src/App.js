import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Add a timeout to apply the fade-in effect after the task is added
    const timeout = setTimeout(() => {
      const lastTaskIndex = tasks.length - 1;
      const taskElements = document.querySelectorAll('.list-group-item');
      if (taskElements[lastTaskIndex]) {
        taskElements[lastTaskIndex].classList.add('fade-in');
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [tasks]);

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary custom-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ul className="list-group mt-3">
        {tasks.map((item, index) => (
          <li className="list-group-item fade-in" key={index}>
            {item}
            <button
              className="btn btn-danger custom-button float-right"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
