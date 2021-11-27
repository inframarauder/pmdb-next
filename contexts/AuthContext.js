import createDataContext from "./createDataContext";
import axios from "axios";

const getUserFromLocalStorage = () => {
	if (typeof window !== "undefined") {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	}
	return null;
};

const initialState = {
	user: getUserFromLocalStorage(),
	loading: false,
	error: "",
};

const authReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case "auth_success":
			return { ...state, user: payload, loading: false };
		case "auth_loading":
			return { ...state, loading: true };
		case "auth_error":
			return { ...state, error: payload, loading: false };
		case "logout":
			return { ...state, user: null };
		default:
			return state;
	}
};

const authenticate =
	(dispatch) =>
	async ({ username, password }) => {
		dispatch({ type: "auth_loading" });
		try {
			const response = await axios.post("/api/auth", {
				username,
				password,
			});
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			dispatch({ type: "auth_success", payload: response.data.user });
		} catch (err) {
			dispatch({ type: "auth_error", payload: err.response.data.error });
		}
	};

const logout = (dispatch) => () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	dispatch({ type: "logout" });
};

export const { Context, Provider } = createDataContext(
	authReducer,
	{ authenticate, logout },
	initialState
);
