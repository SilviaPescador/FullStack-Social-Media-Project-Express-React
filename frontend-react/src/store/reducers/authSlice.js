import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import authHeader from "../../services/auth-header";

export const login = createAsyncThunk("auth/login", async (userData) => {
	try {
		const response = await axios.post(
			"http://localhost:3000/auth/login",
			userData
		);
            console.log(response)
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.log(error.response.data.message);
			throw { message: error.response.data.message };
		} else {
			console.log(error.message);
			throw error.message;
		}
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	localStorage.removeItem("user");
});

export const register = createAsyncThunk("auth/register", async (userData) => {
	const response = await axios.post(
		"http://localhost:3000/auth/register",
		userData
	);
	return response.status;
});

export const changePassword = createAsyncThunk(
	"auth/changePassword",
	async (passwordData, { getState }) => {
		const { user } = getState().auth;
		const response = await axios.put(
			`http://localhost:3000/auth/change-password/${user.id}`,
			passwordData,
			{
				headers: authHeader(),
			}
		);
		return response.status;
	}
);

// SLICE
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: JSON.parse(localStorage.getItem("user")) || null,
		isFetching: false,
		error: false,
		errorMessage: "",
		payload: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isFetching = true;
                        
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.isFetching = false;
				state.error = false;
				state.errorMessage = "";
				state.payload = payload;
			})
			.addCase(login.rejected, (state, { error }) => {
                        state.isFetching = false;
				state.error = true;
				if (error.message) {
					console.log(error.message);
					state.errorMessage = error.message;
				} else if (error.response) {
					console.log(error.response.data.message);
					state.errorMessage = error.response.data.message;
				} else {
					console.log(error);
					state.errorMessage = "Error al iniciar sesión";
				}
				
			})
			.addCase(logout.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isFetching = false;
				state.error = false;
				state.errorMessage = "";
			})
			.addCase(logout.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
				state.errorMessage = payload.message;
			})
			.addCase(register.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isFetching = false;
				state.error = false;
				state.errorMessage = "";
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
				state.errorMessage = payload.message;
			})
			.addCase(changePassword.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.isFetching = false;
				state.error = false;
				state.errorMessage = "";
			})
			.addCase(changePassword.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
				state.errorMessage = payload.message;
			});
	},
});

export default authSlice.reducer;
