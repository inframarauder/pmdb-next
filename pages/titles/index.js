import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/common";
import { TitleCard } from "../../components/Titles";
import styles from "../../styles/Explore.module.css";

import { getTitles } from "../../services/title.service";

const Explore = ({ titles }) => {
	return (
		<Layout>
			<Container className={styles.explore}>
				<legend className="text-center my-4">
					{titles.length} title(s) found....
				</legend>
				<Row className="g-4 my-2">
					{titles.map((title) => (
						<Col md={3} xs={6} key={title._id}>
							<TitleCard title={title} />
						</Col>
					))}
				</Row>
			</Container>
		</Layout>
	);
};

export async function getStaticProps(context) {
	const projection = ["name", "poster", "language", "year", "rating", "genres"];
	const sort = { rating: -1 };
	const data = await getTitles({}, projection, sort);
	const serializedData = JSON.parse(JSON.stringify(data));
	return {
		props: {
			titles: serializedData,
		},
	};
}

export default Explore;
