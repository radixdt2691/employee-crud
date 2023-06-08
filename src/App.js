import React from "react";
import Navbar from "./Components/Navbar";
import AddUsers from "./Components/AddUsers";
import { AllUsers } from "./Components/AllUsers";
import { EditUser } from "./Components/EditUser";
import InvalidForm from "./Components/InvalidForm";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/add" element={<AddUsers/>}  />
        <Route path="/all" element={<AllUsers/>} />
        <Route path="/edit/:id" element={<EditUser/>} />
        <Route path="/invalid" element={<InvalidForm/>}/>
      </Routes >
    </Router>
    
  );
};

export default App;
