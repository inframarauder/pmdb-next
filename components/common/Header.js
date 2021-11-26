import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import SearchForm from "./SearchForm";
import styles from "../../styles/Header.module.css";

const Header = () => {
	const [show, setShow] = useState(false);
	const toggleMenu = () => {
		setShow(!show);
	};

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
					onClick={toggleMenu}
				/>
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
					className={styles.header_offcanvas}
					show={show}
					onHide={toggleMenu}
				>
					<Offcanvas.Header closeButton closeVariant="white">
						<Offcanvas.Title id="offcanvasNavbarLabel">
							PMDb Next!
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<SearchForm toggleMenu={toggleMenu} />
						<hr />
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Nav.Link href="/titles" className={styles.header_link}>
								Explore
							</Nav.Link>
							<Nav.Link href="/auth" className={styles.header_link}>
								Login
							</Nav.Link>
							{/* <Nav.Link href="/titles/add" className={styles.header_link}>
								Add a title
							</Nav.Link>
							<Nav.Link href="/profile" className={styles.header_link}>
								Profile
							</Nav.Link>
							<Nav.Link href="/watchlist" className={styles.header_link}>
								My Watch List
							</Nav.Link> */}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

export default Header;
