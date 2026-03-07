import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/users/";

export default class UserService {
	async getAllUsers() {
		try {
			const response = await axios.get(`${API_URL}`);
			return response.data;
      
		} catch (error) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}

	async getUserById(userId) {
		try {
			const response = await axios.get(`${API_URL}/user/${userId}`);
			// La API devuelve un array; extraemos el objeto usuario
			const data = response.data;
			return Array.isArray(data) ? data[0] : data;
		} catch (error) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}

	async getUserByNickname(nickname) {
		try {
			const response = await axios.get(`${API_URL}/user/nickname/${nickname}`);
			return response.data;
		} catch (error) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}


	async checkUser(userId, nickname, email) {
		try {
			const response = await axios.get(`${API_URL}/check/${userId}`, {
				params: {
					nickname: nickname,
					email: email,
				},
			});

			return response.data;
		} catch (error) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}

	async updateUser(userId, userData) {
		try {
			const response = await axios.patch(
				`${API_URL}/change-data/${userId}`,
				userData,
				{ headers: authHeader() }
			);
			console.log(response.data)
			return response.data;
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.message);
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}

	async deleteUser(userId) {
		try {
			const response = await axios.delete(`${API_URL}/delete/${userId}`, {
				headers: authHeader(),
			});

			return response.data;
		} catch (error) {
			if (error.response) {
				throw new Error(error.response.data.message);
			} else {
				throw error;
			}
		}
	}

	// getUserBoard() {
	//   return axios.get(API_URL + 'user', { headers: authHeader() });
	// }

	// getModeratorBoard() {
	//   return axios.get(API_URL + 'mod', { headers: authHeader() });
	// }

	// getAdminBoard() {
	//   return axios.get(API_URL + 'admin', { headers: authHeader() });
	// }
}
