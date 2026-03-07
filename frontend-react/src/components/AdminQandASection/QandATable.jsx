import { useEffect, useState, useRef } from "react";

import QuerysService from "../../services/querys-services";
import { formatDate } from "../../utils/formatFunctions";

import { AvatarLink } from "../AvatarLink/AvatarLink";

import Modal from "bootstrap/js/dist/modal";
import Swal from "sweetalert2";

function QandATable(props) {
	const { data, user, updateData } = props;
	const userRole = user.role;
	const adminId = user.user_id;

	const [modalInstance, setModalInstance] = useState(null);
	const modalRef = useRef(null);

	const [selectedQueryId, setSelectedQueryId] = useState(null);
	const [newResponse, setNewResponse] = useState("");

	function getIconForStatus(status) {
		if (status === "pending") {
			return <i className="bi bi-hourglass"></i>;
		} else if (status === "responded") {
			return <i className="bi bi-check-lg"></i>;
		} else {
			return null;
		}
	}

	// MODAL PARA AÑADIR RESPUESTA
	useEffect(() => {
		if (modalRef.current) {
			const modal = new Modal(modalRef.current);
			setModalInstance(modal);
		}
	}, []);

	
	const handleSaveResponse = async () => {
		try {
			const querysService = new QuerysService();
			await querysService.addResponse(selectedQueryId, newResponse, adminId);

			await updateData(
				data.map((row) => {
					if (row.query_id === selectedQueryId) {
						return {
							...row,
							response: newResponse,
						};
					}
					return row;
				})
			);

			if (modalInstance) {
				modalInstance.hide();
			}
		} catch (error) {
			Swal.fire("Error", error.message, "error");
			if (modalInstance) {
				modalInstance.hide();
			}
		}
	};

	// Al desloguearse se pierde la instancia del modal (null)
	const handleOpenModal = async (query, adminNewResponse) => {
		setSelectedQueryId(query);
		setNewResponse(adminNewResponse || "");

		if (!modalInstance) {
			const modal = new Modal(modalRef.current);
			setModalInstance(modal);
			modal.show();
		} else {
			modalInstance.show();
		}
	};

	if (data.length === 0) {
		return <p className="text-center">No hay consultas pendientes</p>;
	}

	return (
		<>
			<div className="container  d-flex justify-content-center">
				<div className="card bg-light bg-gradient col-lg-8 col-md-7 col-sm-12 col-xs-12 ">
					<div className="col ">
						<div className="rounded sombra ">
							<table
								style={{ fontSize: "0.9rem" }}
								className="table table-responsive table-hover align-middle bg-light"
							>
								<thead className="text-center align-middle table-dark ">
									<tr>
										{userRole === "admin" && <th scope="col"> Usuario</th>}
										<th scope="col"><i className="bi bi-patch-question fs-5"></i></th>
										<th scope="col">Respuestas</th>
										<th scope="col">Fecha</th>
										{userRole === "admin" && <th scope="col">Estado</th>}
									</tr>
								</thead>
								<tbody>
									{data.map((row) => (
										<tr
											key={row.query_id}
											onClick={() =>
												userRole === "admin"
													? handleOpenModal(row.query_id, row.response)
													: null
											}
										>
											{userRole === "admin" && (
												<td className="text-center">
													<AvatarLink
														userId={row.user_id}
														avatar={row.avatar}
														size={50}
													/>
													{row.nickname}
												</td>
											)}
											<td>{row.query}</td>
											<td>{row.response}</td>
											<td>{formatDate(row.query_date)}</td>
											{userRole === "admin" && (
												<td className="text-center">
													{getIconForStatus(row.query_status)}
												</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/* Modal para añadir Respuesta */}
			<div className="modal" tabIndex="-1" ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Responder al usuario</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => modalInstance.hide()}
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="newResponse">Edita tu respuesta</label>
									<input
										className="form-control"
										id="newResponse"
										type="text"
										value={newResponse}
										onChange={(e) => setNewResponse(e.target.value)}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => modalInstance.hide()}
							>
								Cancelar
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={handleSaveResponse}
							>
								Guardar cambios
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export { QandATable };
