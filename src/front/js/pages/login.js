import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Form } from "../component/form";
import { Navigate, Link } from "react-router-dom";


export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
            {store.auth == true ? <Navigate  to="/private"/>: <Form />}
		</div>
	);
};
