import { Link } from 'react-router-dom';
import './Nav.css';
 
const Nav = () => {
  return (
    <nav>
      <Link to="/"><i className="fas fa-home" /> Home</Link>
      <Link to="/activity"><i className="fas fa-users" /> Activity</Link>
    </nav>
  );
}
 
export default Nav;