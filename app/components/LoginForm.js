// import "../styles/user.scss";

export default function LoginForm() {
  return (
   
      <div id="login-side">
        <h1>LOGIN</h1>
        <p>How i get started lorem ipsum door at?</p>
        <div id="username">
          <div id="user-icon">
            <div
              className="icon-container"
              style={{
                height: "30px",
                width: "30px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            </div>
          </div>
          <input type="text" placeholder="Username" />
        </div>

        <div id="password">
          <div id="pass-icon" style={
            {
                height: "30px",
                width: "30px",
            }    
          }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
</svg>

          </div>
          <input type="text" placeholder="Password" />
          <button>LOGIN</button>
        </div>
      </div>
      
   
  );
}
