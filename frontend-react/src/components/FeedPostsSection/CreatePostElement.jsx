import { useState } from "react";
import { useSelector } from "react-redux";

import PostService from "../../services/post.service.js";

import { AvatarLink } from "../AvatarLink/AvatarLink.jsx";

import Swal from "sweetalert2";

function CreatePostElement(props) {
	const [content, setContent] = useState("");
	const postService = new PostService();
	const user = useSelector((state) => state.auth.user);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const textArea = document.querySelector("#mensaje-post");

		try {
			await postService.createPost(textArea.value, user.user_id);
			setContent("");
			props.updatePosts();
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ha ocurrido un error al crear un nuevo post!",
			});
		}
	};

	return (
		<div className="row">
			<div className="col card bg-light bg-gradient border-0">
				<div className="d-flex w-100 rounded mb-2 p-0">
					<AvatarLink
						userId={user.user_id}
						avatar={user.avatar}
						size="avatar-md"
					/>
					<div className="d-column m-1">
						<h4 id="nickname" className="mt-1">
							{user.nickname}
						</h4>
						<p id="occupation">{user.occupation}</p>
					</div>
				</div>
				<h4 className="align-self-start">Comparte algo con tu comunidad:</h4>
				<form id="form-publicacion" className="w-100" onSubmit={handleSubmit}>
					<textarea
						id="mensaje-post"
						className="form-control sombra rounded"
						placeholder="Max. 256 caracteres"
						maxLength="256"
						rows="3"
						value={content}
						onChange={(event) => setContent(event.target.value)}
					></textarea>
					<div className="d-flex flex-row-reverse">
						<button
							type="submit"
							className="btn btn-sm btn-dark sombra"
							id="crear-publicacion"
						>
							Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export { CreatePostElement };
