import { ModalProvider } from "../contexts/Contexts";
import TasksManager from "./TasksManager";

const App = () => {
  return (
    <ModalProvider>
      <main>
        <h1 id="title">Todo List</h1>
        <TasksManager />
      </main>
    </ModalProvider>
  );
}

export default App;