const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false, 
			newUser: false,
			error: undefined, 
			username: "",
		},
		actions: {
			login: (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"email": email,
						"password": password 
					})
				};
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if(response.status == 200) {
							setStore({ auth: true })
							setStore({ error: undefined })
							let usernameEmail = email.split("@")[0];
							setStore({ username: usernameEmail }) 
						}
						return response.json()
					})
					.then(data => {
						if(data.error) {
							setStore({ error: data.error })
						}
						if(data.access_token) {
							localStorage.setItem("token", data.access_token)
						}
					});
			},
			signup: (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"email": email,
						"password": password 
					})
				};
				fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
				.then(response => {
					if(response.status == 200) {
						setStore({ newUser: true })
						setStore({ error: undefined })
					}
					return response.json()
				})
				.then(data => {
					if(data.error) {
						setStore({ error: data.error })
					}
				})
			},
			// verifyPrivacy: () => {
			// 	const token = localStorage.getItem("token");
			// 	const requestOptions = {
			// 		method: 'GET',
			// 		headers: {
			// 			'Content-Type': 'application/json', 
			// 			'Authorization': 'Bearer ' + token
			// 		},
			// 	};
			// 	fetch(process.env.BACKEND_URL + "/api/protected", requestOptions)
			// 	.then(response => response.json)
			// 	.then(data => setStore({ auth: data.valid }) )
			// 	.catch(error => {
			// 		console.error(error)
            //         return false; 
            //     })
			// 	console.log(getStore().auth);
			// },
			logout: () => {
				localStorage.removeItem("token");
				setStore({ auth: false })
				setStore({ username: "" })
			},
			setNewUser: (value) => {
				setStore({ newUser: value })
			},
			setError: (value) => {
				setStore({ error: value })
			},
			loadBeginning: () => {
				if(localStorage.getItem("token")) return setStore({ auth: true })
			}
		}
	};
};

export default getState;
