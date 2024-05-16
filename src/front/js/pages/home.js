import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.setNewUser(false)
		actions.setError(undefined)
      }, []); 

	return (
		<div className="text-center mt-5">
			<h1>Hello there</h1>
			<h4 className="mb-4">Choose an option</h4>
			<Link to="/login">
				<button className="btn btn-primary mx-2">Login</button>
			</Link>
			<span>or</span>
			<Link to="/signup">
				<button className="btn btn-warning mx-2">Sing up</button>
			</Link>
		</div>
	);
};
