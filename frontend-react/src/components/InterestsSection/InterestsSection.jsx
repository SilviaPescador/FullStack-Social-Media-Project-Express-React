function InterestsSection() {
	return (
		<div className="col-md-2 col-lg-2 d-none d-md-block" style={{ minWidth: "var(--sidebar-width)" }}>
			<div className="sidebar-fixed-left d-none d-md-block">
				<div className="card w-100 text-center mb-2">
					<h4 className="d-lg-block d-md-none card-header">Intereses</h4>
					<div>
						<a
							href="https://github.com/SilviaPescador/FullStack-Social-Media-Project-Express-React"
							target="_blank"
							rel="noreferrer"
						>
							<i
								className="bi bi-github"
								style={{ fontSize: "1.5rem", transform: "scale(2)" }}
								id="icono"
								title="Repositorio del proyecto"
								alt="Github repositorio"
							></i>
						</a>
						<h6 className="d-lg-block d-md-none">Github</h6>
					</div>
					<div>
						<a
							href="https://www.linkedin.com/in/silviapescadorlopez/"
							target="_blank"
							rel="noreferrer"
						>
							<i
								className="bi bi-linkedin"
								style={{ fontSize: "1.5rem", transform: "scale(2)" }}
								id="icono"
								title="Linkedin"
								alt="Linkedin"
							></i>
						</a>
						<h6 className="d-lg-block d-md-none">Linkedin</h6>
					</div>
					<div>
						<a href="/public" target="">
							<i
								className="bi bi-newspaper"
								style={{ fontSize: "1.5rem", transform: "scale(2)" }}
								id="icono"
								alt="lo mas reciente"
							></i>
						</a>
						<h6 className="d-lg-block d-md-none">Actividad reciente</h6>
					</div>
				</div>
				<div className="card w-100">
					<h4 className="d-lg-block d-md-none card-header">Cuenta</h4>
					<div>
						<a href="/app/profile">
							<i
								className="bi bi-person"
								style={{ fontSize: "1.5rem", transform: "scale(2)" }}
								id="icono"
								alt="perfil"
							></i>
						</a>
					</div>
					<div>
						<a href="/app/settings">
							<i
								className="bi bi-gear"
								style={{ fontSize: "1.5rem", transform: "scale(2)" }}
								id="icono"
								alt="configuración"
							></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InterestsSection;
