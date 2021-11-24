import React from "react";
import { Layout } from "../components/common";
import { About, Newest, Popular } from "../components/Home";
import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<Layout>
			<div className={styles.home}>
				<About />
				<Newest />
				<Popular />
			</div>
		</Layout>
	);
};

export default Home;
