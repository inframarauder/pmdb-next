import React from "react";
import { Container } from "react-bootstrap";
import { Layout } from "../../components/common";
import { TitleForm } from "../../components/Titles";
import styles from "../../styles/TitleForm.module.css";

const AddTitle = () => {
	return (
		<Layout admin={true}>
			<Container fluid className={styles.titleFormContainer}>
				<legend className="my-4 text-center">Add Title</legend>
				<TitleForm />
			</Container>
		</Layout>
	);
};

export default AddTitle;
