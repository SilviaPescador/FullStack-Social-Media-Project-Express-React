const pool = require("../db/connection");
const minutesAgo = require("../lib/minutesAgo");

class UserController {
	static async getUsers(req, res) {
		try {
			const results = await pool.query(
				"SELECT user_id, name, firstname, nickname, birthdate, gender, avatar, email, occupation, location, grade, linkedin, language, bio, role, last_login FROM users"
			);

			const allUsersWithLastLogin = results[0].map((result) => ({
				...result,
				lastLogin: minutesAgo(result.last_login),
			}));

			res.status(200).json(allUsersWithLastLogin);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error al buscar los usuarios" });
		}
	}

	static async getUserById(req, res) {
		const userId = parseInt(req.params.user_id);
		try {
			const results = await pool.query(
				"SELECT user_id, name, firstname, nickname, birthdate, gender, avatar, email, occupation, location, grade, linkedin, language, bio, last_login FROM users WHERE user_id = ?",
				[userId]
			);
			if (results.length === 0) {
				return res.status(404).json({ mesage: "Usuario no encontrado" });
			}

			const userWithLastLogin = results[0].map((result) => ({
				...result,
				lastLogin: minutesAgo(result.last_login),
			}));
			res.status(200).send(userWithLastLogin);
		} catch (error) {
			console.error(error);
			console.log("SQL error:", error.sql);
			res.status(500).json({ message: "Error al buscar usuario" });
		}
	}

	static async getUserByNickname(req, res) {
		const nickname = req.params.nickname;
		try {
			const results = await pool.query(
				"SELECT user_id, name, firstname, nickname, birthdate, gender, avatar, email, occupation, location, grade, linkedin, language, bio, last_login FROM users WHERE nickname = ?",
				[nickname]
			);
			if (results.length === 0) {
				return res.status(404).json({ message: "Usuario no encontrado" });
			}
			const userWithLastLogin = results[0].map((result) => ({
				...result,
				lastLogin: minutesAgo(result.last_login),
			}));
			res.status(200).send(userWithLastLogin);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error al buscar usuario" });
		}
	}

	static async checkNicknameOrEmailExists(req, res) {
		try {
			const userId = req.params.user_id;
			const nickname = req.query.nickname;
			const email = req.query.email;

			let query = "SELECT * FROM users WHERE ";
			let params = [];

			if (nickname) {
				query += "(nickname = ? ";
				params.push(nickname);
			} else {
				query += "(";
			}

			if (email) {
				if (params.length > 0) {
					query += "OR ";
				}

				query += "email = ?) ";
				params.push(email);
			} else {
				query += ") ";
			}

			if (params.length === 0) {
				return res.status(400).json({
					message: "Debe proporcionar un nickname o un email",
				});
			}

			// Excluimos el nickname y el email del usuario que hace la peticion
			query += `AND user_id <> ?`;
			params.push(userId);

			// Ejecutamos la query contra la bd
			const results = await pool.query(query, params);

			//modificar en el futuro para que concrete si es el emai o el nickname
			if (results[0].length > 0) {
				return res.status(409).json({
					message: "El nickname o el email ya existen en la base de datos",
				});
			} else {
				return res.status(200).json({
					message: "Puedes usar el nickname y/o el email",
				});
			}
		} catch (error) {
			console.error(error.message);
			res
				.status(500)
				.json({ message: "Error al comprobar el nickname y el email" });
		}
	}

	static async updateUserData(req, res) {
		const userId = req.params.user_id;
		const userData = req.body;

		try {
			const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
				userId,
			]);

			if (!rows || rows.length === 0) {
				return res
					.status(404)
					.json({ message: "El usuario no está en la base de datos" });
			}

			const existingUser = rows[0];
			const updatedFields = {};

			for (const [key, value] of Object.entries(userData)) {
				if (value !== existingUser[key] && value !== "") {
					updatedFields[key] = value;
				}
			}

			// Si no hay campos actualizados, respondemos con un mensaje
			if (Object.keys(updatedFields).length === 0) {
				return res.status(200).json({
					message: "No se han modificado campos de datos",
					user: existingUser,
				});
			}

			await pool.query("UPDATE users SET ? WHERE user_id = ?", [
				updatedFields,
				userId,
			]);

			const [updatedRows] = await pool.query(
				"SELECT * FROM users WHERE user_id = ?",
				[userId]
			);

			return res.status(200).json({
				message: "Usuario actualizado con éxito",
				user: updatedRows[0],
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error al actualizar usuario" });
		}
	}

	static async deleteUser(req, res) {
		const userId = req.params.user_id;
		try {
			// Borrar los registros en la tabla "posts" relacionados al usuario a eliminar
			await pool.query("DELETE FROM posts WHERE posts.user_id = ? ", [userId]);

			// Borrar el usuario
			const usersResult = await pool.query(
				"DELETE FROM users WHERE users.user_id = ? ",
				[userId]
			);

			if (usersResult.affectedRows === 0) {
				res.status(404).json({ error: "User not found" });
			} else {
				res.status(200).json({ message: "User deleted successfully" });
			}
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = UserController;
