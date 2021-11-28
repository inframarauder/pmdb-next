import React, { useState } from "react";
import { Layout } from "../../../components/common";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Alert,
} from "react-bootstrap";
import styles from "../../../styles/WriteReview.module.css";
import api from "../../../utils/frontend/api";
import { readTitle } from "../../../utils/backend/services/title.service";

const WriteReview = ({ title }) => {
	const [formData, setFormData] = useState({
		rating: 1,
		caption: "",
		description: "",
	});

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const review = { ...formData, title: title._id };
			await api.post("/api/reviews/create", review);
			setSuccessMessage("Review submitted successfully!");
		} catch (error) {
			console.error(error);
			if (error.response.data) {
				setErrorMessage(error.response.data.error);
			}
		}
		setLoading(false);
	};
	return (
		<Layout privatePage={true}>
			<Container fluid className={styles.writeReview}>
				<div className={styles.reviewFormContainer}>
					{loading ? (
						<div className="text-center">
							<Spinner animation="border" variant="light" />
						</div>
					) : (
						<>
							{successMessage ? (
								<Alert variant="success" className="my-4 text-center">
									{successMessage}
								</Alert>
							) : (
								<Form className={styles.reviewForm} onSubmit={handleSubmit}>
									<legend className="my-4 text-center">
										Write a review for {title.name}
									</legend>
									<hr />
									{errorMessage && (
										<Alert variant="danger">{errorMessage}</Alert>
									)}
									<Row>
										<Col sm={4}>
											<Form.Group className={styles.formGroup}>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													className={styles.formField}
													name="rating"
													value={formData.rating}
													onChange={handleChange}
												>
													{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
														<option key={rating}>{rating}</option>
													))}
												</Form.Control>
											</Form.Group>
										</Col>

										<Col sm={8}>
											<Form.Group className={styles.formGroup}>
												<Form.Label>Caption</Form.Label>
												<Form.Control
													className={styles.formField}
													type="text"
													name="caption"
													value={formData.caption}
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Form.Group className={styles.formGroup}>
										<Form.Label>Description</Form.Label>
										<Form.Control
											className={styles.formField}
											as="textarea"
											rows={10}
											name="description"
											value={formData.description}
											onChange={handleChange}
										/>
									</Form.Group>
									<Form.Group className="text-center">
										<Button variant="outline-light" type="submit">
											Submit
										</Button>
									</Form.Group>
								</Form>
							)}
						</>
					)}
				</div>
			</Container>
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const { titleId } = context.params;
	const title = await readTitle({ _id: titleId }, ["name"]);
	const serializedData = JSON.parse(JSON.stringify(title));
	return {
		props: {
			title: serializedData,
		},
	};
}

export default WriteReview;
