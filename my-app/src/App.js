// App.js
import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AppNavbar from "./Components/Navbar"; // Updated to AppNavbar
import CreateCar from "./Components/CreateCar";
import ProductList from "./Components/home"; // Import the new ProductList component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userstate, setUserState] = useState({});

  return (
    <div className="App">
      <Router>
        <AppNavbar setUserState={setUserState} />
        <Routes>
          <Route
            path="/"
            element={
              userstate && userstate._id ? (
                <Profile
                  setUserState={setUserState}
                  username={userstate.fname}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          />
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/create-car" element={<CreateCar setUserState={setUserState} />} />
          <Route path="/home" element={<ProductList />} /> {/* Display ProductList on /home */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
