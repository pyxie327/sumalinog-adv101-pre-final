import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const addTask = () => {
    const text = prompt("Enter a cute task 💖:");
    if (!text?.trim()) return;
    setTasks([...tasks, { text, done: false }]);
  };

  const toggleDone = (i) => {
    const list = [...tasks];
    list[i].done = !list[i].done;
    setTasks(list);
  };

  const editTask = (i) => {
    const newText = prompt("Edit task:", tasks[i].text);
    if (!newText?.trim()) return;
    const list = [...tasks];
    list[i].text = newText;
    setTasks(list);
  };

  const deleteTask = (i) => {
    const list = [...tasks];
    list.splice(i, 1);
    setTasks(list);
  };

  const filteredTasks = tasks.filter((task) => {
    if (tab === "todo" && task.done) return false;
    if (tab === "done" && !task.done) return false;
    if (!task.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌸 Cute To-Do App 🌸</h1>

      <input
        className={styles.search}
        type="text"
        placeholder="Search tasks… 💭"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.tabs}>
        <button onClick={() => setTab("all")}>All</button>
        <button onClick={() => setTab("todo")}>To Do</button>
        <button onClick={() => setTab("done")}>Completed</button>
      </div>

      {filteredTasks.map((task, i) => (
        <div key={i} className={`${styles.task} ${styles.fadeIn}`}>
          <span className={task.done ? styles.done : ""}>{task.text}</span>

          <div className={styles.buttons}>
            <button onClick={() => toggleDone(i)}>✓</button>
            <button onClick={() => editTask(i)}>✏️</button>
            <button className={styles.delete} onClick={() => deleteTask(i)}>
              ❌
            </button>
          </div>
        </div>
      ))}

      <button className={`${styles.addBtn} ${styles.bounce}`} onClick={addTask}>
        ➕ Add Cute Task
      </button>
    </div>
  );
}
