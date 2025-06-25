import TaskForm  from "./components/taskForm";
import TaskList  from "./components/taskList";

function App() {
  return (
    <div className="p-4">
      <h1>Index MVP</h1>
      <TaskForm />
      <hr />
      <TaskList />
    </div>
  );
}
export default App;
