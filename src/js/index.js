// src/js/index.js
import React from "react";
import ReactDOM from "react-dom/client";

import "../styles/index.css";

import Home from "./component/home.jsx";

import "@fortawesome/fontawesome-free/css/all.min.css";


const startTime = Date.now();

const root = ReactDOM.createRoot(document.getElementById("app"));

const render = () => {
	const seconds = Math.floor((Date.now() - startTime) / 1000);
	root.render(<Home seconds={seconds} />);
};

setInterval(render, 1000);