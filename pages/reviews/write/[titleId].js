import React from "react";
import { Layout } from "../../../components/common";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../../styles/WriteReview.module.css";

import { readTitle } from "../../../utils/backend/services/title.service";

const WriteReview = ({ title }) => {
	return (
		<Layout privatePage={true}>
			<Container fluid className={styles.writeReview}>
				<div className={styles.reviewFormContainer}>
					<Form className={styles.reviewForm}>
						<legend className="my-4 text-center">
							Write a review for {title.name}
						</legend>
						<hr />
						<Form.Group className={styles.formGroup}>
							<Form.Label>Rating</Form.Label>
							<Form.Control as="select" className={styles.formField}>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
									<option key={rating}>{rating}</option>
								))}
							</Form.Control>
						</Form.Group>
						<Form.Group className={styles.formGroup}>
							<Form.Label>Caption</Form.Label>
							<Form.Control
								className={styles.formField}
								type="text"
								placeholder="Amazing film!"
							/>
						</Form.Group>
						<Form.Group className={styles.formGroup}>
							<Form.Label>Description</Form.Label>
							<Form.Control
								className={styles.formField}
								as="textarea"
								rows={10}
							/>
						</Form.Group>
						<Form.Group className="d-grid gap-2">
							<Button variant="outline-light" type="submit" size="lg">
								Submit
							</Button>
						</Form.Group>
					</Form>
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
