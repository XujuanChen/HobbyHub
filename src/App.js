import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Details from "./pages/Details"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>HistoryHub</h1>
        <Link to="/article">Home</Link>
        <Link to="/create">Create New Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/article" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
