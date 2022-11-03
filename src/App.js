import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

// import "./styles/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";
// import "./styles/output.css";
import Editor from "./Editor/Engine";
import Letter from "./LetterCreate/Letter";

// ===================================
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function App() {
  const getRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(getRedux);
  });
  return (
    <div className='App'>
      <Editor />
      <div id='modal-full' className={`${getRedux?.preview ?? "hide-preview"}`}>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            margin: "0",
            padding: "0",
          }}>
          {getRedux.preview != undefined &&
            getRedux.preview != "hide-preview" && <Letter />}
        </div>
      </div>
    </div>
  );
}

export default App;
