import React, {useEffect, useState} from "react";
import "./Other/App.css";
import Piano from "./Piano";

function App() {
    return (
        <div className="app-container">
            <h1 className="header"> Virtual piano</h1>
            <Piano/>
        </div>
    );
}

export default App;
