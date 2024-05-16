import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Form } from "../component/form";
import { Link, useNavigate } from "react-router-dom";


export const Signup = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.newUser) {
          const timerId = setTimeout(() => {
            navigate("/");
          }, 4000);
          return () => clearTimeout(timerId);
        }
      }, [store.newUser]); 

	return (
		<div className="text-center mt-5">
            {!store.newUser ? 
            <Form />
            :
            <div className="d-flex align-items-center flex-column">
              <h3 className="text-center mt-5 mb-3">User created successfully, redirecting to home </h3>
              <div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
            </div>
            }
		</div>
	);
};