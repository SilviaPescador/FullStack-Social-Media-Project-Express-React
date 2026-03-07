import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DEFAULT_AVATAR = "https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg";
const API_BASE = "http://localhost:3000";

function resolveAvatarUrl(avatar) {
	if (!avatar || typeof avatar !== "string") return null;
	const trimmed = avatar.trim();
	if (!trimmed) return null;
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
	return `${API_BASE}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

function AvatarLink(props) {
	const { userId, avatar, size } = props;
	const navigate = useNavigate();
	const token = useSelector((state) => state.auth.token);
	const [isHovered, setIsHovered] = useState(false);
	const [imgError, setImgError] = useState(false);

	const handleClick = () => {
		token
			? navigate(
					`/app/profile?user_id=${encodeURIComponent(JSON.stringify(userId))}`
			  )
			: navigate("/");
	};
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const isSizeClass = typeof size === "string" && size.startsWith("avatar");
	const avatarStyle = {
		...(typeof size === "number" && { width: size, height: size }),
		borderRadius: "50%",
		border: "1px solid rgba(0,0,0,0.2)",
		cursor: "pointer",
		transition: "transform 0.3s ease",
		transform: isHovered ? "scale(1.1)" : "scale(1)",
		objectFit: "cover",
		display: "block",
	};

	const resolved = resolveAvatarUrl(avatar);
	const avatarSrc = imgError || !resolved ? DEFAULT_AVATAR : resolved;

	return (
		<>
			<button
				onClick={handleClick}
				className="d-block m-2 mt-3"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					background: "none",
					border: "none",
					padding: 0,
					cursor: "pointer",
					textDecoration: "none",
					color: "inherit",
					outline: "none",
				}}
			>
				<img
					className={`avatar ${isSizeClass ? size : ""} rounded rounded-circle align-self-center border`}
					src={avatarSrc}
					style={avatarStyle}
					alt="Avatar del usuario"
					onError={() => setImgError(true)}
				/>
			</button>
		</>
	);
}

export { AvatarLink };
