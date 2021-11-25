import React from "react";
import {
	Navbar,
	Nav,
	Container,
	Offcanvas,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";

import styles from "../../styles/Header.module.css";

const Header = () => {
	return (
		<Navbar
			variant="dark"
			expand={false}
			className={styles.header}
			sticky="top"
		>
			<Container fluid>
				<Navbar.Brand href="/">PMDb Next!</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="offcanvasNavbar"
					className="remove-focus"
				/>
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
					className={styles.header_offcanvas}
				>
					<Offcanvas.Header closeButton closeVariant="white">
						<Offcanvas.Title id="offcanvasNavbarLabel">
							PMDb Next!
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Form className="d-flex remove-focus">
							<FormControl
								type="search"
								placeholder="Search for a movie..."
								className="me-2 remove-focus"
								aria-label="Search"
							/>
							<Button variant="outline-light remove-focus">Search</Button>
						</Form>
						<hr />
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="/explore" className={styles.header_link}>
								Explore
							</Nav.Link>
							<Nav.Link href="/auth" className={styles.header_link}>
								Login
							</Nav.Link>
							<Nav.Link href="/profile" className={styles.header_link}>
								{" "}
								Profile
							</Nav.Link>
							<Nav.Link href="/watchlist" className={styles.header_link}>
								My Watch List
							</Nav.Link>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

export default Header;
