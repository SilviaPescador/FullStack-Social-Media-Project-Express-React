import {  useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authSlice";

import { NavbarItem } from "./NavbarItem";
import Searchbar from "../SearchBar/SearchBar";
import Swal from "sweetalert2";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const user = useSelector((state) => state.auth.user);
	const token= useSelector((state) => state.auth.token);
	const admin = user ? user.role === "admin" : false;


	const greeting = user
		? user.gender=== "F"
			? `Bienvenida ${user.nickname}`
			: `Bienvenido ${user.nickname}`
		: null;

	const handleLogout = async () => {
		await Swal.fire({
			title: `Hasta la próxima ${user.nickname} `,
			text: "Tu comunidad te espera!",
			imageUrl: "https://unsplash.it/400/200",
			imageWidth: 400,
			imageHeight: 200,
			imageAlt: "Custom image",
		});
		dispatch(logout())
		navigate("/");
	};

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm" style={{ zIndex: 1030 }}>
			<div className="app-content navbar-content">
				{/* COMPONENTE DEL LOGO */}
				<div className="flex-shrink-0">
					<Link to="/" className="navbar-brand">
						<img className="logo" src="/enter-black.png" alt="Logo-Tecla"/>
					</Link>
				</div>

				

				{/* MENÚ HAMBURGUESA */}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* ELEMENTOS DE LA NAVBAR */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav">
						{/* MENSAJE DE BIENVENIDA */}
						<li className="nav-item">
							<h5 className="nav-welcome d-none d-md-block rounded rounded-5 p-2 bg-light border border-light shadow-sm">
								{!token ? (
									<>
										¡¡Echa un vistazo!!
										
									</>
								) : (
									greeting
								)}
							</h5>
						</li>
						<li className="nav-item mx-5">
							{/* COMPONENTE DE BUSQUEDA */}
							{location.pathname === "/app/friends" && <Searchbar />}

						</li>
					</ul>

					

					<ul className="navbar-nav flex-row ms-auto mb-2 mb-lg-0">
						{/* VOLVER ATRÁS --- location.pathname !== "/" */}
						{token && (
							<NavbarItem
								icon="bi-arrow-bar-left"
								alt="Volver atrás"
								onClick={handleBack}
								title="Atrás"
							/>
						)}

						{/* ADMINISTRADOR -DATOS DE USUARIOS */}
						{token && admin && (
							<NavbarItem
								icon="bi-person-lock"
								alt="Usuarios registrados"
								to="/app/admin"
								title="Usuarios registrados"
							/>
						)}

						{/* CONSULTAS AL ADMINISTRADOR */}
						{token && (
							<NavbarItem
								icon="bi-question-square"
								alt="Registrarse"
								to="/app/admin-querys"
								title="Registrarse"
							/>
						)}

						{/* EXPLORAR LA COMUNIDAD - PÚBLICO*/}
						
						<NavbarItem
							icon="bi-binoculars"
							alt="Explorar"
							to="/public"
							title="Explorar publicaciones"
						/>
						

						{/* REGISTRARSE */}
						{!token && (
							<NavbarItem
								icon="bi-plus-square"
								alt="Registrarse"
								to="/register"
								title="Registrarse"
							/>
						)}

						{/* HOME-LOGIN */}
						<NavbarItem 
							icon="bi-house" 
							alt="Landing page-login" 
							to="/" 
							title="Home-login"
						/>
						
						{/* FEED */}
						{token && (
							<NavbarItem 
								icon="bi-rss" 
								alt="Feed personal" 
								to="/app/feed" 
								title="Feed personal"
							/>
						)}

						{/* PERFIL */}
						{token && (
							<NavbarItem
								icon="bi-person-fill"
								alt="Mi perfil"
								to="/app/profile"
								title="Tu perfil"
							/>
						)}

						{/* COMUNIDAD */}
						{token && (
							<NavbarItem
								icon="bi-people-fill"
								alt="Comunidad"
								to="/app/friends"
								title="Comunidad"
							/>
						)}

						{/* SETTINGS */}
						{token && (
							<NavbarItem
								icon="bi-gear"
								alt="Settings"
								href="/app/settings"
								to="/app/settings"
								title="Ajustes de la cuenta"
							/>
						)}

						{/* CERRAR SESIÓN */}
						{token && (
							<NavbarItem
								icon="bi-box-arrow-right"
								alt="Cerrar sesión"
								onClick={handleLogout}
								title="Cerrar sesión"
							/>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export { Navbar };
