import { useEffect, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board.tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')

  // 読み込んだタスクの最大 ID から採番を再開し、リロード後の ID 衝突を防ぐ
  const nextIdRef = useRef(
    tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks((prev) => [...prev, { id: nextIdRef.current++, title, done: false }])
    setText('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <div className="app">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          className="add-input"
          placeholder="新しいタスクを入力..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-button">
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません。</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item${task.done ? ' done' : ''}`}
            >
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-title">{task.title}</span>
              </label>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label="削除"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 0 && (
        <p className="status">
          残り {remaining} 件 / 全 {tasks.length} 件
        </p>
      )}
    </div>
  )
}
