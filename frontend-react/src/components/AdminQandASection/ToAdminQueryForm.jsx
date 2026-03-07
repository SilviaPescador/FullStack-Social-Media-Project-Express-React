import { useForm } from "react-hook-form";

import QuerysService from "../../services/querys-services";

function ToAdminQueryForm(props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const {userId, updateData } = props;

	const onSubmit = async (data) => {
		
		try {
			const querysService = new QuerysService();
			const newQuery = data.query_body

			const addNewQuery = await querysService.addQuery(userId, newQuery);

			updateData((prevData) => [...prevData, addNewQuery]);
			reset({ query_body: "" });	
			
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<div className="d-flex justify-content-center">
			<div className="container col-lg-8 col-md-7 card bg-light bg-gradient">
				<h2 className="mb-3 text-center"><i className="bi bi-patch-question"></i> Consulta a los administradores</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="w-100">
					<div className="mb-3">
						
						<textarea
							name="consulta"
							{...register("query_body")}
							className="form-control"
							placeholder="Escribe tu consulta aquí"
							rows="3"
						/>
						{errors.query_body && (
							<div className="alert alert-danger">{errors.query_body.message}</div>
						)}
					</div>
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-dark sombra ">
							Enviar consulta
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export { ToAdminQueryForm };
