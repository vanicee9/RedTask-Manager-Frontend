<<<<<<< HEAD
// import TaskForm from "./components/TaskForm";
import LoginForm from "./components/login/LoginForm"
import SignUpForm from "./components/SignUpForm";
export default function Home() {
  return (
    
    
    <>

    <LoginForm/>
      <SignUpForm/>
      </>
   
=======
import TaskForm from "./components/TaskForm/TaskForm";
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
      <TaskForm />
     
    </div>
>>>>>>> 2c4633411cc5cc309469e838cc3bb1aa4b80201b
  );
}     