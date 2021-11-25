import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const MostPopular = ({ mostPopular }) => {
	return (
		<Container className="text-center">
			<h3 className="text-center my-4">Some of the most popular titles...</h3>
			<hr />
			<Row>
				{mostPopular.map((title, index) => {
					return (
						<Col key={index} md={3} className="my-2">
							<Card className={styles.mostPopularCard}>
								<Card.Img
									variant="top"
									src={title.poster}
									className={styles.mostPopularCardPoster}
								/>
								<Card.Body>
									<Card.Title>
										{title.title} ({title.year})
									</Card.Title>
									<Card.Text>{title.rating}/10</Card.Text>
								</Card.Body>
								<Card.Footer className={styles.mostPopularCardFooter}>
									<Link href={`/titles/${title._id}`}>
										<a className={styles.mostPopularCardLink}>View Title</a>
									</Link>
								</Card.Footer>
							</Card>
						</Col>
					);
				})}
			</Row>

			<Link href="/titles">
				<Button className={styles.exploreMoreBtn}>Explore more</Button>
			</Link>
		</Container>
	);
};

export default MostPopular;
