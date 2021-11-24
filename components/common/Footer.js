import React from "react";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p className="text-center">
				PMDb Next ©️ 2021 <br />
				Made with ❤️ by{" "}
				<a
					href="https://subhasis.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.footer_link}
				>
					Subhasis Das
				</a>{" "}
			</p>
		</footer>
	);
};

export default Footer;
