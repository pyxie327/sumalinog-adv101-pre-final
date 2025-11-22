import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const addTask = () => {
    const text = prompt("Enter task:");
    if (!text?.trim()) return;
    setTasks([...tasks, { text, done: false }]);
  };

  const toggleDone = (i) => {
    const copy = [...tasks];
    copy[i].done = !copy[i].done;
    setTasks(copy);
  };

  const editTask = (i) => {
    const newText = prompt("Edit task:", tasks[i].text);
    if (!newText?.trim()) return;
    const copy = [...tasks];
    copy[i].text = newText;
    setTasks(copy);
  };

  const deleteTask = (i) => {
    const copy = [...tasks];
    copy.splice(i, 1);
    setTasks(copy);
  };

  const filteredTasks = tasks.filter((task) => {
    if (tab === "todo" && task.done) return false;
    if (tab === "done" && !task.done) return false;
    if (!task.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <h1>Simple To-Do App</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <div className={styles.tabs}>
        <button onClick={() => setTab("all")}>All</button>
        <button onClick={() => setTab("todo")}>To Do</button>
        <button onClick={() => setTab("done")}>Completed</button>
      </div>

      {filteredTasks.map((task, i) => (
        <div key={i} className={styles.task}>
          <span className={task.done ? styles.done : ""}>{task.text}</span>

          <div>
            <button onClick={() => toggleDone(i)}>✓</button>
            <button onClick={() => editTask(i)}>Edit</button>
            <button className={styles.delete} onClick={() => deleteTask(i)}>
              X
            </button>
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={addTask}>
        Add Task
      </button>
    </div>
  );
}
