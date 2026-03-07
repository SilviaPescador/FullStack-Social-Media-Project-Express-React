import ExcelJS from "exceljs";
import { AvatarLink } from "../AvatarLink/AvatarLink";

function UserGrid(props) {
	function formatDate(date, includeTime = false) {
		const options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: includeTime ? "2-digit" : undefined,
			minute: includeTime ? "2-digit" : undefined,
			second: includeTime ? "2-digit" : undefined,
		};
		return new Date(date).toLocaleDateString("es-ES", options);
	}

	const createDataArray = () => {
		const headers = [
			"Avatar",
			"ID",
			"Rol",
			"Alias",
			"Nombre",
			"Apellido",
			"Email",
			"Ocupacion",
			"Ubicación",
			"Nac.",
			"Género",
			"Linkedin",
			"Idioma",
			"Última conexión",
		];

		const data = props.users.map((user) => [
			user.avatar,
			user.user_id,
			user.role,
			user.nickname,
			user.name,
			user.firstname,
			user.email,
			user.occupation,
			user.location,
			formatDate(user.birthdate),
			user.gender,
			user.linkedin,
			user.language,
			formatDate(user.last_login, true),
		]);

		return [headers, ...data];
	};

	const exportToExcel = async () => {
		const data = createDataArray();
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Tabla de usuarios");

		data.forEach((row) => worksheet.addRow(row));

		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "Tabla de usuarios.xlsx";
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="container-fluid  rounded sombra">
			<h2 className="text-center pt-3">
				Usuarios registrados{" "}
				<button className="btn fs-3" onClick={exportToExcel}>
					<i className="bi bi-file-earmark-spreadsheet"></i>
				</button>
			</h2>
			<div className="row">
				<div className="col">
					<div className="bg-light">
						<div className="table-responsive rounded sombra">
							<table className="table table-responsive table-fluid overflow-auto border border-dark text-start align-middle table-hover table-striped ">
								<thead className="border border-dark border-3 text-sm-start">
									<tr className="fs-5 text-center align-middle table-success">
										<th>Avatar</th>
										<th className="border border-dark">ID</th>
										<th>Rol</th>
										<th>Alias</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th>Email</th>
										<th>Ocupacion</th>
										<th>Ubicación</th>
										<th>Nac.</th>
										<th>Género</th>
										<th>Linkedin</th>
										<th>Idioma</th>
										<th>Última conexión</th>
									</tr>
								</thead>
								<tbody>
									{props.users.map((user) => (
										<tr key={user.user_id} style={{ fontSize: "0.8rem" }} >
											<td>
												<AvatarLink
													userId={user.user_id}
													avatar={user.avatar}
													size={50}
												/>
											</td>
											<td className="border border-dark table-success text-center">
												{user.user_id}
											</td>
											<td >{user.role}</td>
											<td>@{user.nickname}</td>
											<td>{user.name}</td>
											<td>{user.firstname}</td>
											<td>{user.email}</td>
											<td>{user.occupation}</td>
											<td>{user.location}</td>
											<td className="text-center">
												{formatDate(user.birthdate)}
											</td>
											<td className="text-center">{user.gender}</td>
											<td>{user.linkedin}</td>
											<td>{user.language}</td>
											<td className="text-center">
												{formatDate(user.last_login, true)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserGrid;
