import React from "react";
import { Layout } from "../components/common";
import { About, MostPopular } from "../components/Home";
import styles from "../styles/Home.module.css";
import { getTitles } from "../services/title.service";

const Home = ({ mostPopular }) => {
	return (
		<Layout>
			<div className={styles.home}>
				<About />
				<MostPopular mostPopular={mostPopular} />
			</div>
		</Layout>
	);
};

export async function getStaticProps(context) {
	const projection = ["name", "poster", "language", "year", "rating", "genres"];
	const sort = { rating: -1 };
	const limit = 8;

	const data = await getTitles({}, projection, sort, limit);

	const serializedData = JSON.parse(JSON.stringify(data));

	return {
		props: {
			mostPopular: serializedData,
		},
	};
}

export default Home;
