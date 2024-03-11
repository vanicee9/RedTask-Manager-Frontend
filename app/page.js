// import TaskForm from "./components/TaskForm";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
export default function Home() {
  return (
    <div className="full-screen"style = {{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* <TaskForm /> */}
      <LoginForm/>
      <SignUpForm/>
    </div>
  );
}     