import createDataContext from "./createDataContext";
import axios from "axios";

const initialState = {
	titles: [],
	loading: false,
};

const titlesReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case "get_titles":
			return { ...state, titles: payload, loading: false };
		case "set_loading":
			return { ...state, loading: true };
		case "stop_loading":
			return { ...state, loading: false };
		default:
			return state;
	}
};

const getTitles = (dispatch) => {
	return (params) => {
		dispatch({ type: "set_loading" });
		axios
			.get("/api/titles", { params })
			.then((res) => {
				dispatch({ type: "get_titles", payload: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
		dispatch({ type: "stop_loading" });
	};
};

const setTitles = (dispatch) => {
	return (titles) => {
		dispatch({ type: "get_titles", payload: titles });
	};
};

export const { Context, Provider } = createDataContext(
	titlesReducer,
	{ getTitles, setTitles },
	initialState
);
