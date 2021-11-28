import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "../../styles/TitleCard.module.css";

const TitleCard = ({ title, deleteBtn, deleteFn }) => {
	const [showDetails, setShowDetails] = useState(true);

	const updateCardView = () => {
		if (window.innerWidth < 1200) {
			setShowDetails(false);
		} else {
			setShowDetails(true);
		}
	};

	useEffect(() => {
		updateCardView();
		window.addEventListener("resize", updateCardView);
		return () => {
			window.removeEventListener("resize", updateCardView);
		};
	}, []);

	return (
		<>
			{deleteBtn && (
				<div className={styles.deleteBtnContainer}>
					<Button
						variant="danger"
						className={styles.deleteBtn}
						onClick={() => deleteFn(title._id)}
					>
						<i className="fa fa-trash"></i>
					</Button>
				</div>
			)}
			<Link href={`/titles/${title._id}`}>
				<Card className={styles.titleCard}>
					<Card.Img
						variant="top"
						src={title.poster}
						className={styles.titleCardPoster}
					/>
					{showDetails && (
						<Card.Title className={styles.titleCardTitle}>
							<div className={styles.titleLine}>
								<span className={styles.titleName}>{title.name} </span>
								<strong>{title.rating}</strong>
							</div>

							<span className={styles.smallInfo}>{title.year}</span>
							<br />
							<span className={styles.smallInfo}>{title.language}</span>
							<br />
							<span className={styles.smallInfo}>{title.genres}</span>
						</Card.Title>
					)}
				</Card>
			</Link>
		</>
	);
};

export default TitleCard;
