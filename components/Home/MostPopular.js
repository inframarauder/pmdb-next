import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const mockData = [
	{
		title: "Joker",
		year: "2019",
		poster:
			"https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
		rating: 8.5,
	},
	{
		title: "JoJo Rabbit",
		year: "2019",
		poster:
			"https://m.media-amazon.com/images/M/MV5BZjU0Yzk2MzEtMjAzYy00MzY0LTg2YmItM2RkNzdkY2ZhN2JkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg",
		rating: 8.3,
	},
	{
		title: "The Irishman",
		year: "2019",
		poster:
			"https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg",
		rating: 8,
	},
	{
		title: "The Guilty",
		year: "2021",
		poster:
			"https://centralrecorder.com/wp-content/uploads/2021/10/XMdHDw8cBML9mOhJrYWqEo6ORg.jpg",
		rating: 9.1,
	},
];

const MostPopular = () => {
	return (
		<Container className="text-center">
			<h3 className="text-center my-4">Some of the most popular titles...</h3>
			<hr />
			<Row>
				{mockData.map((movie, index) => {
					return (
						<Col key={index} md={3} className="my-2">
							<Card className={styles.mostPopularCard}>
								<Card.Img
									variant="top"
									src={movie.poster}
									className={styles.mostPopularCardPoster}
								/>
								<Card.Body>
									<Card.Title>
										{movie.title} ({movie.year})
									</Card.Title>
									<Card.Text>{movie.rating}/10</Card.Text>
								</Card.Body>
								<Card.Footer className={styles.mostPopularCardFooter}>
									<Link href={`/titles/${index}`}>
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
