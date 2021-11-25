import React from "react";
import { Layout } from "../components/common";
import { About, MostPopular } from "../components/Home";
import styles from "../styles/Home.module.css";
import { connectDb } from "../utils/db";
import Title from "../models/title.model";

connectDb();

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
	const data = await Title.find(
		{},
		{ name: 1, rating: 1, poster: 1, year: 1, genres: 1 }
	)
		.sort({ rating: -1 })
		.limit(10)
		.lean();

	const serializedData = JSON.parse(JSON.stringify(data));
	return {
		props: {
			mostPopular: serializedData,
		},
	};
}

export default Home;
