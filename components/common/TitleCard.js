import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/TitleCard.module.css";

const TitleCard = ({ title }) => {
	return (
		<Card className={styles.titleCard}>
			<Card.Title className={styles.titleCardTitle}>
				<Link href={`/titles/${title._id}`}>
					<span>
						<a className={styles.titleCardLink}>
							{title.name} ({title.year})
						</a>
						<br />
						<small className={styles.smallInfo}>{title.language}</small>
					</span>
				</Link>
				<span>
					<strong>{title.rating}</strong>/
					<small className={styles.smallInfo}>10</small>
				</span>
			</Card.Title>
			<Row>
				<Col>
					<img
						src={title.poster}
						alt={title.name}
						className={styles.titleCardPoster}
					/>
				</Col>
				<Col>
					<Card.Body>
						<Card.Text>
							Genres <br />
							<span className={styles.smallInfo}> {title.genres}</span>
						</Card.Text>
						<Card.Text>
							Cast <br />
							<span className={styles.smallInfo}> {title.cast}</span>
						</Card.Text>
						<Card.Text>
							Directed By <br />
							<span className={styles.smallInfo}> {title.directedBy}</span>
						</Card.Text>
						<Card.Text>
							Written By <br />
							<span className={styles.smallInfo}> {title.writtenBy}</span>
						</Card.Text>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
};

export default TitleCard;
