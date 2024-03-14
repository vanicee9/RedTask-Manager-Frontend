import { FaUserAlt, FaLock } from "react-icons/fa";
import "./login.scss";
function LoginForm() {
  return (
    <div className="container">
      <div className="leftSide">
        <div className="login-details">
          <h1>LOGIN</h1>
          <p>How I get started lorem ipsum door at?</p>

          <div id="username" className="user-options">
            <FaUserAlt className="icons" />

            <input type="text" placeholder="Username" />
          </div>

          <div id="password" className="user-options">
            <FaLock className="icons" />

            <input type="password" placeholder="Password" />
          </div>

          <div>
            <button id="btn">LOGIN NOW</button>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div id="inner-div">
          <p> Very good works are waiting for you login now!!</p>
          <img id="girl" src="/unnamed.png" alt="image" />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
