import React from "react";
import { Row, Col, Accordion, Container } from "react-bootstrap";
import Lottie from "lottie-react";
import movieTheatreLottie from "../../public/lotties/movie-theatre.json";
import styles from "../../styles/Home.module.css";
const accordionData = [
	{
		title: "Get info about your favourite movies",
		content:
			"Cast, director, rating, plot and even streaming service - you get all the info about all your favourite movies right here!",
	},
	{
		title: "Rate, review and read reviews by others",
		content:
			"Express how you feel about a movie and also get to see what others think. Share your opinions about your favourite movies on our platform!",
	},
	{
		title: "Create your own watchlists",
		content:
			"Create your own collection of movies and curate them in a list of your own! Use your watchlist to binge watch your favourite movies!",
	},
];

const About = () => {
	return (
		<Container fluid>
			<Row className={styles.about}>
				<Col className={styles.aboutLottieContainer}>
					<Lottie
						animationData={movieTheatreLottie}
						className={styles.aboutLottie}
					/>
				</Col>
				<Col>
					<h3 className="my-4">Welcome to PMDb Next!</h3>
					<span>
						Public Movie Database (PMDb) Next is an opensource movie database
						and review application built entirely using Next.js!
					</span>
					<hr />
					<Accordion>
						{accordionData.map((item, index) => (
							<Accordion.Item key={index} eventKey={index}>
								<Accordion.Header>{item.title}</Accordion.Header>
								<Accordion.Body className={styles.accordionBody}>
									{item.content}
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</Col>
			</Row>
		</Container>
	);
};

export default About;
