import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../../styles/TitleForm.module.css";

const TitleForm = () => {
	return (
		<Form className={styles.titleForm}>
			<Row className="mb-3">
				<Col sm={4}>
					<Form.Group>
						<Form.Label>Year</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
				<Col sm={4}>
					<Form.Group>
						<Form.Label>Genre(s)</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
				<Col sm={4}>
					<Form.Group>
						<Form.Label>Language</Form.Label>
						<Form.Control type="language" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col sm={8}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
				<Col sm={4}>
					<Form.Group>
						<Form.Label>Runtime (mins)</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col sm={6}>
					<Form.Group>
						<Form.Label>Poster Link</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group>
						<Form.Label>Trailer Link</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col sm={12}>
					<Form.Group>
						<Form.Label>Plot</Form.Label>
						<Form.Control as="textarea" rows="5" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col sm={12}>
					<Form.Group>
						<Form.Label>Cast</Form.Label>
						<Form.Control as="textarea" rows="2" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col sm={6}>
					<Form.Group>
						<Form.Label>Director(s)</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group>
						<Form.Label>Writer(s)</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Form.Label> Streaming Links</Form.Label>
				<Col sm={4}>
					<Form.Label>Netflix</Form.Label>
					<Form.Control type="text" />
				</Col>
				<Col sm={4}>
					<Form.Label>Prime Video</Form.Label>
					<Form.Control type="text" />
				</Col>
				<Col sm={4}>
					<Form.Label>Disney Plus Hotstar</Form.Label>
					<Form.Control type="text" />
				</Col>
				<Col sm={4}>
					<Form.Label>Youtube</Form.Label>
					<Form.Control type="text" />
				</Col>
				<Col sm={4}>
					<Form.Label>Other</Form.Label>
					<Form.Control type="text" />
				</Col>
			</Row>
		</Form>
	);
};

export default TitleForm;
