/** PROFILE:
 * UseLocation permite obtener la información del id del usuario pasado por parámetro desde la URL
 * Si no existe ese valor, se renderiza el perfi del usuario que está logueado por defecto.
*/

import { useLocation } from "react-router-dom";

import Layout from "../../components/Layout";
import InterestsSection from "../../components/InterestsSection/InterestsSection";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import FeedbackSection from "../../components/FeedbackSection/FeedbackSection";

function Profile() {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const friendId = parseInt(params.get("user_id")) || null;

	return (
		<Layout>
			<InterestsSection />
			<div className="col-12 col-md-10 col-lg-10 overflow-hidden">
				<div className="w-100">
					<ProfileSection friendId={friendId} />
					<div className="row">
						<FeedbackSection friendId={friendId} />
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Profile;
