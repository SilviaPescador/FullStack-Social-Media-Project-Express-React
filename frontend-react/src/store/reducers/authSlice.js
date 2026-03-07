import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import authHeader from "../../services/auth-header";

export const login = createAsyncThunk("auth/login", async (userData) => {
	try {
		const response = await axios.post(
			"http://localhost:3000/auth/login",
			userData
		);
		if (response.data.token) {
			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem("token", JSON.stringify( response.data.token));
		}
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.message);
		} else {
			console.log(error.message);
			throw new Error(error.message);
		}
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
});

export const register = createAsyncThunk("auth/register", async (userData) => {
	try {
		const response = await axios.post(
			"http://localhost:3000/auth/register",
			userData
		);
		return response.status;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
});

export const changePassword = createAsyncThunk(
	"auth/changePassword",
	async (passwordData) => {
		try {
			const response = await axios.put(
				`http://localhost:3000/auth/change-password`,
				passwordData,
				{
					headers: authHeader(),
				}
			);
			console.log(response)
			return response.status;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	}
);


// SLICE
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: JSON.parse(localStorage.getItem("user")) || null,
		token: JSON.parse(localStorage.getItem("token")) || null,
		isFetching: false,
		error: false,
		payload: null,
	},
	reducers: {
		setUser: (state, { payload }) => {
			if (payload) {
				state.user = payload;
				localStorage.setItem("user", JSON.stringify(payload));
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.token = payload.token;
				state.isFetching = false;
				state.error = false;
				state.payload = payload;
			})
			.addCase(login.rejected, (state) => {
				state.isFetching = false;
				state.error = true;
			})
			.addCase(logout.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				state.isFetching = false;
				state.error = false;
			})
			.addCase(logout.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
			})
			.addCase(register.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isFetching = false;
				state.error = false;
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
			})
			.addCase(changePassword.pending, (state) => {
				state.isFetching = true;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.isFetching = false;
				state.error = false;
			})
			.addCase(changePassword.rejected, (state, { payload }) => {
				state.isFetching = false;
				state.error = true;
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
