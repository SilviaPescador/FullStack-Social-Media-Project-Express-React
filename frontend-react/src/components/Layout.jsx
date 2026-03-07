import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main className="app-main">
				<div className="app-content">
					<div className="row justify-content-center align-items-start g-3 g-md-4">
						{children}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default Layout;