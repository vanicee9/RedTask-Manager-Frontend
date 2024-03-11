import { FaUserAlt, FaLock } from 'react-icons/fa';
import "./login.scss";
function LoginForm() {
  return (
    <div className="container">
      <div className="leftSide">
      <div className="login-details">
        <h1>LOGIN</h1>
        <p>How I get started lorem ipsum door at?</p>
        
        <div id="username">
          <div id="userIcon">
            <FaUserAlt />
          </div>
          <input type="text" placeholder="Username"/>
        </div>

        <div id="password">
          <div id="pass-icon">
            <FaLock />
          </div> 
          <input type="password" placeholder="Password" />
        </div>
        
       
        <div id="btn">
        <button>LOGIN NOW</button></div>
      </div>
      </div>
     <div className="rightSide">
      
     </div>

    </div>
  );
}

export default LoginForm;
