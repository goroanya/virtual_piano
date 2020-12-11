import React, {useEffect, useState} from "react";
import "./Other/App.css";
import Piano from "./Piano";

function App() {
    document.body.style = 'background: #444;';

    return (
        <div className="app-container">
            <h1 className="header"> Virtual piano</h1>
            <Piano/>
        </div>
    );
}

export default App;
