import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/reducers/authSlice";

import InputField from "../../InputField/InputField";
import UserService from "../../../services/user.service";

import Swal from "sweetalert2";

function ModifyUserData() {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const user = useSelector((state) => state.auth.user);
	const userService = new UserService();

	const title =
		"Puedes modificar los datos que necesites,\nal acabar, te redirigiremos al login por seguridad.";

	const onSubmit = async (data) => {
		try {
			if (data.nickname !== user.nickname || data.email !== user.email) {
				await userService.checkUser(user.user_id, data.nickname, data.email);
			}

			const updatedUser = await userService.updateUser(user.user_id, data);

			if (updatedUser.message) {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${updatedUser.message}! te redirigiremos al login por seguridad.`,
					showConfirmButton: false,
					timer: 2000,
				});
				dispatch(logout());
				navigate("/");
			} else {
				Swal.fire(
					"Ha habido algún problema con la modificación de tus datos, vuelve a intentarlo."
				);
			}

			reset();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: `Oops...${error.message}`,
				text: "Tus datos no han podido modificarse,\npor favor inténtalo nuevamente.",
			});
			return;
		}
	};

	return (
		<>
			<h2 className="text-center" title={title}>
				<i className="bi bi-person-lines-fill"></i> Edita tus datos
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} id="modify-user-data">
				<div className="row">
					<div className="col">
						<Controller
							name="name"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="name"
									label="Nombre:"
									type="text"
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
					<div className="col">
						<Controller
							name="firstname"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="firstname"
									label="Apellido:"
									type="text"
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
				</div>

				<Controller
					name="nickname"
					control={control}
					defaultValue={user.nickname}
					render={({ field }) => (
						<InputField
							id="nickname"
							label="Nickname:"
							type="text"
							required={false}
							{...field}
							register={register}
						/>
					)}
				/>
				<div className="row">
					<div className="col">
						<Controller
							name="birthdate"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="birthdate"
									label="Nacimiento:"
									type="date"
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
					<div className="col">
						<Controller
							name="gender"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="gender"
									label="Género:"
									type="select"
									options={[
										{ value: "", label: "" },
										{ value: "M", label: "Masculino" },
										{ value: "F", label: "Femenino" },
										{ value: "O", label: "Otro" },
									]}
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
				</div>

				<Controller
					name="avatar"
					control={control}
					defaultValue={user?.avatar ?? ""}
					render={({ field }) => (
						<InputField
							id="avatar"
							label="Avatar:"
							type="text"
							required={false}
							{...field}
							register={register}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					defaultValue={user.email}
					render={({ field }) => (
						<InputField
							id="email"
							label="Email:"
							type="email"
							placeholder="ejemplo@mail.com"
							required={false}
							{...field}
							register={register("email", {
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Email inválido",
								},
							})}
						/>
					)}
				/>
				{errors.email && <p className="text-danger">{errors.email.message}</p>}

				<div className="row">
					<div className="col">
						<Controller
							name="occupation"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="occupation"
									label="Ocupación:"
									type="text"
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
					<div className="col">
						<Controller
							name="location"
							control={control}
							defaultValue={""}
							render={({ field }) => (
								<InputField
									id="location"
									label="Ubicación:"
									type="text"
									required={false}
									{...field}
									register={register}
								/>
							)}
						/>
					</div>
				</div>

				<Controller
					name="grade"
					control={control}
					defaultValue={""}
					render={({ field }) => (
						<InputField
							id="grade"
							label="Grado académico:"
							type="text"
							required={false}
							{...field}
							register={register}
						/>
					)}
				/>
				<Controller
					name="linkedin"
					control={control}
					defaultValue={""}
					render={({ field }) => (
						<InputField
							id="linkedin"
							label="Perfil de LinkedIn:"
							type="text"
							required={false}
							{...field}
							register={register}
						/>
					)}
				/>
				<Controller
					name="language"
					control={control}
					defaultValue={""}
					render={({ field }) => (
						<InputField
							id="language"
							label="Idioma:"
							type="text"
							required={false}
							{...field}
							register={register}
						/>
					)}
				/>
				<button type="submit" className="btn btn-dark ">
					Guardar cambios
				</button>
			</form>
			<hr />
		</>
	);
}

export { ModifyUserData };
