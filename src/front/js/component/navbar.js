import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<span className="navbar-brand mb-0 h1">User authentication system</span>
				{store.auth == true && 
				<div className="ml-auto">
					<Link to="/">
						<button onClick={actions.logout} className="btn btn-primary">Log out</button>
					</Link>
				</div>
				}
			</div>
		</nav>
	);
};
