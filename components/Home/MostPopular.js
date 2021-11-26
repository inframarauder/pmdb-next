import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { TitleCard } from "../Titles";

const MostPopular = ({ mostPopular }) => {
	return (
		<Container className="text-center">
			<h3 className="text-center my-4">Some of the most popular titles...</h3>
			<hr />
			<Row>
				{mostPopular.map((title, index) => {
					return (
						<Col key={index} md={3} xs={6} className="my-2">
							<TitleCard title={title} />
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
