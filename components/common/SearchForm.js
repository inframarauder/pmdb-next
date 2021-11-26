import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";

const SearchForm = ({ toggleMenu }) => {
	const router = useRouter();
	const [rating, setRating] = useState("Min. Rating");
	const [searchText, setSearchText] = useState("");

	const handleChange = (e) => {
		if (e.target.name === "rating" && e.target.value !== "Min. Rating") {
			setRating(e.target.value);
		} else {
			setSearchText(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (rating !== "Min. Rating" || searchText.length > 0) {
			let query = {};
			if (rating !== "Min. Rating") {
				query["rating"] = rating;
			}
			if (searchText.length > 0) {
				query["searchText"] = searchText;
			}
			toggleMenu();
			router.push({ pathname: "titles", query });
		}
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Floating className="mb-3 text-dark">
					<Form.Control
						name="searchText"
						value={searchText}
						onChange={handleChange}
						type="search"
						placeholder="Search by name, genre, language..."
						className="remove-focus"
					/>
					<label htmlFor="floatingInputCustom">
						Search by name, genre, language...
					</label>
				</Form.Floating>
				<Form.Group className={styles.searchFormCol}>
					<Form.Select
						className={`remove-focus ${styles.searchFormSelect}`}
						name="rating"
						onChange={handleChange}
					>
						{["Min. Rating", ...Array(10).keys()].map((item, index) =>
							index > 0 ? (
								<option key={item + 1}>{item + 1}</option>
							) : (
								<option key={item}>{item}</option>
							)
						)}
					</Form.Select>

					<Button variant="outline-light" type="submit">
						Search
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default SearchForm;
