import React from 'react';
import logo from '../logo.svg';
import './App.css';
import { Link } from "react-router-dom";

function SecondPage() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          This is the second page!
        </p>
        <Link to="/">Home page</Link>
      </header>
    </div>
  );
}

export default SecondPage;
