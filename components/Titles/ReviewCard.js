import React from "react";
import { Card } from "react-bootstrap";
import styles from "../../styles/TitleDetails.module.css";

const ReviewCard = ({ review }) => {
	return (
		<Card className={`mb-3 ${styles.reviewCard}`}>
			<Card.Header>
				<div className={styles.reviewHeader}>
					<div className={styles.reviewHeaderLeft}>
						<Card.Title>{review.caption}</Card.Title>
						<Card.Subtitle className={styles.reviewUsername}>
							@{review.user.username}
							<br />
							<span className={styles.reviewDate}>
								{new Date(review.createdAt).toDateString().slice(4)}
							</span>
						</Card.Subtitle>
					</div>
					<div className={styles.reviewHeaderRight}>
						<h1>{review.rating}</h1>
					</div>
				</div>
			</Card.Header>
			<Card.Body>
				<Card.Text className="p-4">{review.description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ReviewCard;
