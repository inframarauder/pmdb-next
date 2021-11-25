import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout, TitleCard } from "../../components/common";
import { connectDb } from "../../utils/db";
import Title from "../../models/title.model";
import styles from "../../styles/Explore.module.css";

connectDb();

const Explore = ({ titles }) => {
	return (
		<Layout>
			<Container className={styles.explore}>
				<legend className="text-center my-4">
					{titles.length} title(s) found....
				</legend>
				<Row className="g-4 my-2">
					{titles.map((title) => (
						<Col md={6} key={title._id}>
							<TitleCard title={title} />
						</Col>
					))}
				</Row>
			</Container>
		</Layout>
	);
};

export async function getStaticProps(context) {
	const projections = {
		plot: 0,
		trailerLink: 0,
	};
	const data = await Title.find({}, projections).sort({ ratiing: -1 }).lean();
	const serializedData = JSON.parse(JSON.stringify(data));
	return {
		props: {
			titles: serializedData,
		},
	};
}

export default Explore;
