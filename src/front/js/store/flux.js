const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false, 
			newUser: false,
			error: "",
			errorMessage: false
		},
		actions: {
			// Use getActions to call a function within a fuction
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
						if(response.status == 200) setStore({ auth: true })
						return response.json()
					})
					.then(data => {
						if(data.error) {
							setStore({ error: data.error })
							setStore({ errorMessage: true })
						}
						if(data.access_token) {
							localStorage.setItem("token", data.access_token)
							setStore({ errorMessage: false })
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
						setStore({ errorMessage: false })
					}
					return response.json()
				})
				.then(data => {
					if(data.error) {
						setStore({ error: data.error })
						setStore({ errorMessage: true })
					}
					else setStore({ errorMessage: false })
				})
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ auth: false })
			},
			setNewUser: (value) => {
				setStore({ newUser: value })
			},
			loadBeginning: () => {
				if(localStorage.getItem("token")) return setStore({ auth: true })
			}
		}
	};
};

export default getState;
