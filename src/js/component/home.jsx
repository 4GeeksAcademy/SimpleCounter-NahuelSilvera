// src/js/component/home.jsx
import React from "react";
import { SecondsCounter } from "./SecondsCounter"; 

const Home = ({ seconds }) => {
	return (
		<div className="body">
			<SecondsCounter counter={seconds} />
		</div>
	);
};

export default Home;