import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();


  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };


  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };


  const markComplete = async (task) => {
    if (task.status === "Completed") return;

    await API.put(`/tasks/${task._id}`, {
      status: "Completed",
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <h2>TaskForge Dashboard</h2>

      <form onSubmit={createTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>

      {tasks?.map((task) => (
        <div key={task._id} className="task">
          <span className={task.status === "Completed" ? "Completed" : ""}>
            {task.title}
            {task.status === "Completed" && " ✔"}
          </span>

          <div>
            {task.status === "Pending" ? (
              <button
                className="success"
                onClick={() => markComplete(task)}
              >
                Mark Complete
              </button>
            ) : (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Completed
              </span>
            )}

            <button
              className="danger"
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "6px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;