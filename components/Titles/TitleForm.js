import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import api from "../../utils/frontend/api";
import styles from "../../styles/TitleForm.module.css";

const TitleForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		year: "",
		runtime: "",
		language: "",
		genres: "",
		directedBy: "",
		writtenBy: "",
		cast: "",
		plot: "",
		poster: "",
		trailerLink: "",
		netflix: "",
		prime: "",
		hotstar: "",
		youtube: "",
		other: "",
		rating: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const title = {
				name: formData.title,
				year: parseInt(formData.year),
				runtime: parseInt(formData.runtime),
				language: formData.language,
				genres: formData.genres,
				directedBy: formData.directedBy,
				writtenBy: formData.writtenBy,
				cast: formData.cast,
				plot: formData.plot,
				poster: formData.poster,
				trailerLink: formData.trailerLink,
				rating: parseFloat(formData.rating),
				streamingOn: [],
			};
			if (formData.netflix) {
				title.streamingOn.push({
					name: "Netflix",
					code: "netflix",
					url: formData.netflix,
				});
			}
			if (formData.prime) {
				title.streamingOn.push({
					name: "Amazon Prime Video",
					code: "prime",
					url: formData.prime,
				});
			}
			if (formData.hotstar) {
				title.streamingOn.push({
					name: "Disney Plus Hotstar",
					code: "hotstar",
					url: formData.hotstar,
				});
			}
			if (formData.youtube) {
				title.streamingOn.push({
					name: "Youtube",
					code: "youtube",
					url: formData.youtube,
				});
			}
			if (formData.other) {
				title.streamingOn.push({
					name: "Other",
					code: "other",
					url: formData.other,
				});
			}
			const res = await api.post("/api/titles", title);
			setSuccess(res.data.message);
		} catch (error) {
			console.error(error);
			if (error.response.status === 400) {
				setError(error.response.data.error);
			}
		}

		setLoading(false);
	};

	return (
		<Form className={styles.titleForm} onSubmit={handleSubmit}>
			{error && <Alert variant="danger">{error}</Alert>}
			{success && <Alert variant="success">{success}</Alert>}
			{loading ? (
				<div className="text-center">
					<Spinner animation="border" variant="white" />
				</div>
			) : (
				<>
					<Row className="mb-3">
						<Col sm={4}>
							<Form.Group>
								<Form.Label>Year</Form.Label>
								<Form.Control
									type="number"
									name="year"
									value={formData.year}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={4}>
							<Form.Group>
								<Form.Label>Genre(s)</Form.Label>
								<Form.Control
									type="text"
									name="genres"
									value={formData.genres}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={4}>
							<Form.Group>
								<Form.Label>Language</Form.Label>
								<Form.Control
									type="language"
									name="language"
									value={formData.language}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col sm={8}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									value={formData.title}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={4}>
							<Form.Group>
								<Form.Label>Runtime (mins)</Form.Label>
								<Form.Control
									type="number"
									name="runtime"
									value={formData.runtime}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col sm={6}>
							<Form.Group>
								<Form.Label>Poster Link</Form.Label>
								<Form.Control
									type="text"
									name="poster"
									value={formData.poster}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group>
								<Form.Label>Trailer Link</Form.Label>
								<Form.Control
									type="text"
									name="trailerLink"
									value={formData.trailerLink}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col sm={12}>
							<Form.Group>
								<Form.Label>Plot</Form.Label>
								<Form.Control
									as="textarea"
									rows="8"
									name="plot"
									value={formData.plot}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col sm={8}>
							<Form.Group>
								<Form.Label>Cast</Form.Label>
								<Form.Control
									type="text"
									name="cast"
									value={formData.cast}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={4}>
							<Form.Group>
								<Form.Label>Initial Rating (out of 10)</Form.Label>
								<Form.Control
									type="number"
									name="rating"
									value={formData.rating}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col sm={6}>
							<Form.Group>
								<Form.Label>Director(s)</Form.Label>
								<Form.Control
									type="text"
									name="directedBy"
									value={formData.directedBy}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group>
								<Form.Label>Writer(s)</Form.Label>
								<Form.Control
									type="text"
									name="writtenBy"
									value={formData.writtenBy}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="mb-3">
						<Form.Label> Streaming Links</Form.Label>
						<Col sm={4}>
							<Form.Label>Netflix</Form.Label>
							<Form.Control
								type="text"
								name="netflix"
								value={formData.netflix}
								onChange={handleChange}
							/>
						</Col>
						<Col sm={4}>
							<Form.Label>Prime Video</Form.Label>
							<Form.Control
								type="text"
								name="prime"
								value={formData.prime}
								onChange={handleChange}
							/>
						</Col>
						<Col sm={4}>
							<Form.Label>Disney Plus Hotstar</Form.Label>
							<Form.Control
								type="text"
								name="hotstar"
								value={formData.hotstar}
								onChange={handleChange}
							/>
						</Col>
						<Col sm={4}>
							<Form.Label>Youtube</Form.Label>
							<Form.Control
								type="text"
								name="youtube"
								value={formData.youtube}
								onChange={handleChange}
							/>
						</Col>
						<Col sm={4}>
							<Form.Label>Other</Form.Label>
							<Form.Control
								type="text"
								name="other"
								value={formData.other}
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Form.Group className="text-center">
								<Button variant="outline-light" type="submit">
									Submit
								</Button>
							</Form.Group>
						</Col>
					</Row>
				</>
			)}
		</Form>
	);
};

export default TitleForm;
