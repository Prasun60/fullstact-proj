import Addmovie from "./components/Addmovie";
import Getmovies from "./components/Getmovies";
import {BrowserRouter as Router, Route,  Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Getmovies />} />
          <Route path="/addmovie/:id" element={<Addmovie />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;