import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessagePasswords, setErrorMessagePasswords] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const location = useLocation()

    const buttonText = location.pathname === "/login" ? "Login" : "Sign Up";

    function sendData(e) {
        e.preventDefault()
        if(location.pathname === "/signup") {
            if(password != confirmPassword) setErrorMessagePasswords(true)
            else {
            setErrorMessagePasswords(false)
            actions.signup(email, password)
            }
        }
        else if(location.pathname === "/login") actions.login(email, password)
    }

	return (
        <div className="row d-flex justify-content-center">
            <form className="form col-12 col-md-10 col-lg-6 col-xl-3" onSubmit={sendData}>
                <h1 className="mb-4 signup">{buttonText}</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="form--input" />
                <div className="col-12 position-relative">
                    <input type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="form--input"
                    />
                    <button 
                    onClick={() => setShowPassword(!showPassword)} 
                    className={`btn fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} 
                    type="button"
                    >
                    </button>
                </div>
                {location.pathname === "/signup" && 
                    <div className="col-12 position-relative">
                        <input type={showConfirmPassword ? "text" : "password"} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm password" 
                        className="form--input"
                        />
                        <button 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className={`btn fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`} 
                        type="button"
                        >
                        </button>
                    </div>
                }
                <button className="form--submit">
                    {buttonText}
                </button>
                {errorMessagePasswords &&           
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    Your passwords must match
                </div>
                }
                {store.errorMessage &&           
                <div className="alert alert-danger mt-4 py-2" role="alert">
                    {store.error}
                </div>
                }
                <Link to="/" className="mt-3">
                    back home
                </Link>
            </form>        
        </div>
	);
};