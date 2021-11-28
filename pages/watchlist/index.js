import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Link from "next/link";
import { Layout } from "../../components/common";
import { TitleCard } from "../../components/Titles";
import api from "../../utils/frontend/api";
import styles from "../../styles/Watchlist.module.css";

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getWatchlist = async () => {
			setLoading(true);
			const res = await api.get("/api/users/watchlist");
			setWatchlist(res.data.watchlist);
			setLoading(false);
		};
		getWatchlist();
	}, []);
	const removeFromWatchlist = async (titleId) => {
		setLoading(true);
		await api.put(`/api/users/watchlist`, { titleId, operation: "remove" });
		setWatchlist(watchlist.filter((title) => title._id !== titleId));
		setLoading(false);
	};
	return (
		<Layout privatePage={true}>
			<Container className={styles.watchlistContainer}>
				<legend className="text-center my-4">Your Watchlist</legend>
				<hr />
				{loading ? (
					<div className={styles.loading}>
						<Spinner animation="border" variant="primary" />
					</div>
				) : (
					<>
						{watchlist.length > 0 ? (
							<Row>
								{watchlist.map((title) => (
									<Col key={title._id} xs={6} md={4}>
										<TitleCard
											title={title}
											deleteBtn={true}
											deleteFn={removeFromWatchlist}
										/>
									</Col>
								))}
							</Row>
						) : (
							<div className={styles.empty}>
								<h4>You have no titles in your watchlist...</h4>
								<p>Add some stuff here!</p>
								<p>
									<Link href="/titles">
										<a className={styles.link}>Explore titles</a>
									</Link>
								</p>
							</div>
						)}
					</>
				)}
			</Container>
		</Layout>
	);
};

export default Watchlist;
