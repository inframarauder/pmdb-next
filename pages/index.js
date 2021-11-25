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
	const mostPopular = await Title.find().sort({ rating: -1 }).limit(10);
	return {
		props: {
			mostPopular: JSON.parse(JSON.stringify(mostPopular)),
		},
	};
}

export default Home;
