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
import styles from "../../styles/Auth.module.css";

const Signup = () => {
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

	const handleChange = async (e) => {
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
		authenticate(formData, "login");
	};

	return (
		<Layout>
			<Container fluid className={styles.loginContainer}>
				<div className={styles.formContainer}>
					<div className={styles.loginCaption}>
						Login to PMDb Next!
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
								/>
							</Form.Group>
							<Form.Group className={styles.formField}>
								<InputGroup className="mb-3">
									<Form.Control
										type={inputType}
										placeholder="Password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										autoComplete="off"
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
							<Form.Group className={styles.formField}>
								<Button
									type="submit"
									variant="outline-light"
									className="w-100 remove-focus"
								>
									Login
								</Button>
							</Form.Group>
							<div className="text-center p-3">
								{"Don't have an account?"}
								<br />
								<Link href="/signup">
									<Button size="sm" variant="outline-light" className="my-2">
										Signup Here!
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

export default Signup;
