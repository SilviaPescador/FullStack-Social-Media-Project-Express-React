import { useEffect, useState } from "react";

import UserService from "../../services/user.service";

import Layout from "../../components/Layout";
import UserGrid from "../../components/AdminUserDataSection/UserGrid";

function Admin() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const userService = new UserService();
				const currentUsers = await userService.getAllUsers();
				setUsers(currentUsers);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUsers();
	}, []);

	return (
		<Layout>
			<div className="col-12">
				<UserGrid users={users} />
			</div>
		</Layout>
	);
}

export default Admin