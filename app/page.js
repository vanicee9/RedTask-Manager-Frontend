import TaskForm from "./components/TaskForm";
export default function Home() {
  return (
    <div className="full-screen"style = {{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <TaskForm />
    </div>
  );
}