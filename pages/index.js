import React from "react";
import { Layout } from "../components/common";
import { About, MostPopular } from "../components/Home";
import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<Layout>
			<div className={styles.home}>
				<About />
				<MostPopular />
			</div>
		</Layout>
	);
};

export default Home;
