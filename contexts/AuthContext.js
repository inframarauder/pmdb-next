import createDataContext from "./createDataContext";
import axios from "axios";

const initialState = {
	user: null,
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
			dispatch({ type: "auth_success", payload: response.data.user });
		} catch (err) {
			dispatch({ type: "auth_error", payload: err.response.data.error });
		}
	};

const logout = (dispatch) => () => {
	localStorage.removeItem("token");
	dispatch({ type: "logout" });
};

export const { Context, Provider } = createDataContext(
	authReducer,
	{ authenticate, logout },
	initialState
);
