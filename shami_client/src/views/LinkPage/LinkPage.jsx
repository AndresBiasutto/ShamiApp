import { Link } from "react-router-dom"

const LinkPage = () => {
  return (
    <div>
    <h3>Link page</h3>
    <p>links</p>
    <h4>public</h4>
    <Link to="/register">register page </Link>
    <br />
    <Link to="/login">login page </Link>
    <h4>protected</h4>
    <Link to="/editor">editor page </Link>
    <br />
    <Link to="/admin">Admin page </Link>
    <br />
    <Link to="/lounge">lounge page </Link>
    <br />
    <Link to="/">home </Link>
  </div>
  )
}

export default LinkPage