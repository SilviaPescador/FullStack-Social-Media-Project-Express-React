import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../store/reducers/authSlice";
import UserService from '../../services/user.service';

import { ModifyUserData } from "./Forms/ModifyUserData";
import { ModifyUserPassword } from "./Forms/ModifyUserPassword";
import { AvatarLink } from "../AvatarLink/AvatarLink";
import { DeleteAccountButton } from "./Forms/DeleteAccountButton";

function ConfigContainer() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userService = new UserService();

	// Sincronizar usuario con la API al montar (avatar y datos actualizados)
	useEffect(() => {
		if (user?.user_id) {
			userService.getUserById(user.user_id)
				.then((freshUser) => {
					// getUserById devuelve el objeto usuario (o array según la API)
					const userData = Array.isArray(freshUser) ? freshUser[0] : freshUser;
					if (userData && userData.user_id) {
						dispatch(setUser(userData));
					}
				})
				.catch(() => {});
		}
	}, [user?.user_id, dispatch]);

	if (!user) return null;

	const handleDeleteAccount = async () => {
		await userService.deleteUser(user.user_id);
		dispatch(logout());
		navigate('/');
	    };

	return (
		<>
			<div className="card bg-transparent bg-gradient">
				<div className="card-header">
					<h2>
						Configuración&nbsp;<i className="bi bi-gear"></i>
					</h2>
				</div>
				<div className="card-body w-100">
					<div className="row g-4">
						<div className="col-lg-4 col-12 order-1 order-lg-0">
							<div className="card sombra mb-0 h-100">
								<h2 className="text-center mt-2">Tu cuenta</h2>
								<div className="card-body p-3 bg-transparent d-flex flex-column align-items-center">
									<AvatarLink userId={user?.user_id} avatar={user?.avatar || undefined} size="avatar-lg" />
									<p id="name-firstname">{user?.name} {user?.firstname}</p>
									<p id="email" className="ipad-email">{user?.email}</p>
									<p id="nickname"><i className="bi bi-person-fill"></i> {user?.nickname}</p>
								</div>
								<div id="msj-elim" className="h3"></div>
								<div className="mt-4 text-center">
									<DeleteAccountButton onDelete={handleDeleteAccount} />
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-12 order-0 order-lg-1">
							{/* FORMULARIOS */}
							<ModifyUserData />
							<ModifyUserPassword />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ConfigContainer;
