import React from "react";
import axios from "axios";
import { Layout } from "../components/common";
import { About, MostPopular } from "../components/Home";
import styles from "../styles/Home.module.css";

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
	const res = await axios.get("http://localhost:3000/api/titles/most_popular");
	return {
		props: {
			mostPopular: res.data.titles,
		},
	};
}

export default Home;
