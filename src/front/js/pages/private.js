import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import secretImage from "/workspaces/JorgeAJT-authentication-system/src/front/img/plus-ultra.jpg"

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		// actions.verifyPrivacy()
		
		// if (!store.auth || !localStorage.getItem("token")) {
		// 	const timerId = setTimeout(() => {
		//   	navigate("/login");
		// 	}, 4000);
		// 	return () => clearTimeout(timerId);
	  	// }

	  	if (!store.auth) {
			const timerId = setTimeout(() => {
		  	navigate("/login");
			}, 4000);
			return () => clearTimeout(timerId);
	  	}
	}, [store.auth]); 

	return (
		<>		
		{!store.auth ? 
        <div className="d-flex align-items-center flex-column">
			<h3 className="text-center mt-5">You're trying to access to a private content, please <strong>login</strong> before </h3>
			<div className="newtons-cradle">
				<div className="newtons-cradle__dot"></div>
				<div className="newtons-cradle__dot"></div>
				<div className="newtons-cradle__dot"></div>
				<div className="newtons-cradle__dot"></div>
			</div>
		</div>
		:
		<div className="container d-flex flex-column align-items-center">
			<img src={secretImage} alt="Secret Image" className="w-50 my-4"/>
		</div>
		}
		</>
	);
};
