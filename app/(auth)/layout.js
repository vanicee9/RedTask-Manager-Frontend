import "../styles/user.scss"

export default function layout({ children }) {
  return (
    <div className="container">
        <div className="left-side">
            {children}
        </div>

        <div className="right-side">
            
        </div>
    </div>
  )
}
