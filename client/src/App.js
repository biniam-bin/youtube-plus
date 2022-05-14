
import React from 'react'
import Nav from "./components/Nav"
import Home from './pages/Home';
import Watch from './pages/Watch'
import Result from "./pages/Results"
// import Nav from "./components/Nav"
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/watch/:id" element={ <Watch/>}/>
        <Route path="/results" element={ <Result/>}/>
      </Routes>
    </div>
  );
}

export default App;
