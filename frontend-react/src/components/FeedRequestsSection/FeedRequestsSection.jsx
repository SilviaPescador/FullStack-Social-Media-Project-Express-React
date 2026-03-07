import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FriendService from "../../services/friend.service";

import { FriendshipRequestCard } from "./FriendshipRequestCard";

import Swal from "sweetalert2";

const MAX_REQUESTS_DISPLAYED = 4;

function FeedRequestsSection() {
	const [requests, setRequests] = useState([]);
	const user = useSelector((state) => state.auth.user);

	const fetchRequests = async () => {
		const friendService = new FriendService();

		try {
			const newRequests = await friendService.getFriendshipRequests(
				user.user_id
			);
			setRequests(newRequests);
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ha ocurrido un error al obtener las peticiones de amistad!",
			});
		}
	};

	const handleAction = () => {
		fetchRequests();
	};

	useEffect(() => {
		fetchRequests();
	}, [user.user_id]);

	const displayedRequests = requests.slice(0, MAX_REQUESTS_DISPLAYED);
	const hasMore = requests.length > MAX_REQUESTS_DISPLAYED;

	return (
		<div className="col-md-2 col-lg-2 d-none d-md-block" style={{ minWidth: "var(--sidebar-width)" }}>
			<div
				id="friendship-requests"
				className="sidebar-fixed-right card d-none d-md-block fit p-2"
			>
				<h4 className="text-center p-md-0 p-lg-0 card-header">Solicitudes</h4>
				{requests.length !== 0 ? (
					<>
						{displayedRequests.map((request) => (
							<FriendshipRequestCard
								key={request.friendship_id}
								data={request}
								onAction={handleAction}
							/>
						))}
						{hasMore && (
							<Link to="/app/friends" className="btn btn-sm btn-outline-dark w-100 mt-2">
								Ver todas ({requests.length})
							</Link>
						)}
					</>
				) : (
					<div className="card-body text-center w-100">
						No tienes solicitudes de amistad
					</div>
				)}
			</div>
		</div>
	);
}

export default FeedRequestsSection;
