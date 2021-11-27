import React, { useState } from "react";
import { Form, Container, Button, InputGroup, Alert } from "react-bootstrap";
import axios from "axios";
import { Layout } from "../../components/common";
import styles from "../../styles/Login.module.css";

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
			const res = await axios.post("/api/users/checkusername", { username });
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

	return (
		<Layout>
			<Container fluid className={styles.loginContainer}>
				<div className={styles.formContainer}>
					<div className={styles.loginCaption}>
						Login to PMDb Next!
						<br />
						<span className={styles.infoText}>
							If username does not exist, new user will be created.
						</span>
						<hr />
					</div>

					<Form className={styles.form}>
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
								Login
							</Button>
						</Form.Group>
					</Form>
				</div>
			</Container>
		</Layout>
	);
};

export default Login;
