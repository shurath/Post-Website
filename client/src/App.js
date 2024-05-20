import "./App.css";
import { BrowserRouter as Router, Route, Routes, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
        <Link to="/createpost">Create A Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link>

        <Link to="/home">Home Page</Link>
        </div>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}




export default App;