import React, { useState, useContext, useEffect } from "react";
import {
	Form,
	Container,
	Button,
	InputGroup,
	Alert,
	Spinner,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Layout } from "../../components/common";
import api from "../../utils/frontend/api";
import styles from "../../styles/Auth.module.css";

const Login = () => {
	const [inputType, setInputType] = useState("password");
	const [icon, setIcon] = useState("fa fa-eye-slash");

	const togglePasswordShow = () => {
		if (inputType === "password") {
			setInputType("text");
			setIcon("fa fa-eye");
		} else {
			setInputType("password");
			setIcon("fa fa-eye-slash");
		}
	};

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState({
		username: "",
		password: "",
	});

	const validateUsername = async (username) => {
		let message = "";
		if (username.length <= 3) {
			message = "Username must be at least 3 characters long";
		} else if (username.length > 12) {
			message = "Username must be less than 12 characters long";
		} else {
			const res = await api.post("/api/users/checkusername", { username });
			if (!res.data.available) {
				message = "Username already taken";
			}
		}
		setErrorMessage({ ...errorMessage, username: message });
	};

	const validatePassword = (password) => {
		let message = "";
		if (password.length <= 6) {
			message = "Password must be at least 6 characters long";
		} else if (password.length > 12) {
			message = "Password must be less than 12 characters long";
		}
		setErrorMessage({ ...errorMessage, password: message });
	};

	const handleChange = async (e) => {
		if (e.target.name === "username") {
			validateUsername(e.target.value);
		}
		if (e.target.name === "password") {
			validatePassword(e.target.value);
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const { state, authenticate } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (state.user) {
			router.push("/titles");
		}
	}, [state.user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (errorMessage.username === "" && errorMessage.password === "") {
			authenticate(formData, "signup");
		}
	};

	return (
		<Layout>
			<Container fluid className={styles.loginContainer}>
				<div className={styles.formContainer}>
					<div className={styles.loginCaption}>
						Signup for PMDb Next!
						<br />
						<span className={styles.infoText}>
							Create an account to review your favorite movies and create your
							own watchlist.
						</span>
						<hr />
					</div>
					{state.loading ? (
						<div className={styles.spinnerContainer}>
							<Spinner animation="border" variant="light" />
						</div>
					) : (
						<Form className={styles.form} onSubmit={handleSubmit}>
							{state.error.length > 0 && (
								<Alert variant="danger">{state.error}</Alert>
							)}
							<Form.Group className={styles.formField}>
								<Form.Control
									type="text"
									placeholder="Username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									autoComplete="off"
									className={
										errorMessage.username.length > 0
											? "remove-focus " + styles.fieldError
											: "remove-focus"
									}
								/>
							</Form.Group>
							{errorMessage.username.length > 0 && (
								<Alert variant="danger">{errorMessage.username}</Alert>
							)}

							<Form.Group className={styles.formField}>
								<InputGroup className="mb-3">
									<Form.Control
										type={inputType}
										placeholder="Password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										autoComplete="off"
										className={
											errorMessage.password.length > 0
												? "remove-focus " + styles.fieldError
												: "remove-focus"
										}
									/>
									<Button
										variant="outline-light"
										onClick={() => togglePasswordShow()}
										className="remove-focus"
									>
										<i className={icon}></i>
									</Button>
								</InputGroup>
							</Form.Group>
							{errorMessage.password.length > 0 && (
								<Alert variant="danger">{errorMessage.password}</Alert>
							)}
							<Form.Group className={styles.formField}>
								<Button
									type="submit"
									variant="outline-light"
									className="w-100 remove-focus"
								>
									Signup
								</Button>
							</Form.Group>
							<div className="text-center p-3">
								Already have an account?
								<br />
								<Link href="/login">
									<Button size="sm" variant="outline-light" className="my-2">
										Login Here!
									</Button>
								</Link>
							</div>
						</Form>
					)}
				</div>
			</Container>
		</Layout>
	);
};

export default Login;
