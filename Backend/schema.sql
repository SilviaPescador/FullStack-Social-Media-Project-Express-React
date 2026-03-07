-- =============================================
-- Script de creación de base de datos bd_equipo3
-- Proyecto: FullStack Social Media Project
-- Base de datos: MySQL
-- =============================================
-- Uso: mysql -u root -p < schema.sql
-- O ejecutar desde MySQL Workbench / cliente MySQL
-- =============================================

DROP DATABASE IF EXISTS bd_equipo3;
CREATE DATABASE bd_equipo3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bd_equipo3;

-- =============================================
-- TABLA: users
-- =============================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE,
    gender ENUM('M', 'F', 'O') DEFAULT 'O',
    avatar TEXT,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    occupation VARCHAR(100),
    location VARCHAR(150),
    grade VARCHAR(100),
    linkedin VARCHAR(255),
    language VARCHAR(50) DEFAULT 'es',
    bio TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: posts
-- =============================================
CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    image TEXT,
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    like_number INT DEFAULT 0,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =============================================
-- TABLA: friends
-- =============================================
CREATE TABLE friends (
    friendship_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_friendship (sender_id, receiver_id)
);

-- =============================================
-- TABLA: courses
-- =============================================
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =============================================
-- TABLA: feedback
-- =============================================
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    feedback_sender INT NOT NULL,
    feedback_receiver INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (feedback_sender) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (feedback_receiver) REFERENCES users(user_id) ON DELETE CASCADE
);

-- =============================================
-- TABLA: querys
-- =============================================
CREATE TABLE querys (
    query_id INT AUTO_INCREMENT PRIMARY KEY,
    query TEXT NOT NULL,
    user_id INT NOT NULL,
    query_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response TEXT NULL,
    response_date TIMESTAMP NULL,
    admin_id INT NULL,
    query_status ENUM('pending', 'responded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX idx_users_nickname ON users(nickname);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_date ON posts(post_date);
CREATE INDEX idx_friends_sender ON friends(sender_id);
CREATE INDEX idx_friends_receiver ON friends(receiver_id);
CREATE INDEX idx_friends_status ON friends(status);
CREATE INDEX idx_courses_user_id ON courses(user_id);
CREATE INDEX idx_feedback_sender ON feedback(feedback_sender);
CREATE INDEX idx_feedback_receiver ON feedback(feedback_receiver);
CREATE INDEX idx_querys_user_id ON querys(user_id);
CREATE INDEX idx_querys_status ON querys(query_status);
CREATE INDEX idx_querys_admin_id ON querys(admin_id);

-- =============================================
-- USUARIOS DE PRUEBA
-- Contraseña para todos: Grupo3!!
-- (hashes bcrypt verificados)
-- =============================================

INSERT INTO users (name, firstname, nickname, birthdate, gender, avatar, password, email, occupation, location, grade, linkedin, language, bio, role) VALUES
('Admin', 'Sistema', 'admin', '1990-01-01', 'O', 'https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg', '$2b$10$J9eNi8ZETa0knG3VbhUo9.VglT5Zta2ZySfneMdvgkJi/4Y5/UQvi', 'admin@tecla.local', 'Administrador', 'Madrid, España', 'Master', 'https://linkedin.com/in/admin', 'es', 'Administrador del sistema', 'admin'),
('Laura', 'Martínez', 'lauram', '1992-05-15', 'F', 'https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg', '$2b$10$h7Yxej42I6aI6eAjOJXgOu90QeWS4Sp2Yclqin9VGULCGgjn.mEw.', 'laura.martinez@tecla.local', 'Desarrolladora Full Stack', 'Barcelona, España', 'Ingeniería Informática', 'https://linkedin.com/in/lauramartinez', 'es', 'Apasionada por la tecnología y el desarrollo web', 'user'),
('Carlos', 'Ruiz', 'carlosr', '1988-08-22', 'M', 'https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg', '$2b$10$F5HKqCkXU29LiHbWpDA.VeIZdUdrXtm8mrQG2X06hu0owzVMH4gn.', 'carlos.ruiz@tecla.local', 'Diseñador UX/UI', 'Valencia, España', 'Diseño Gráfico', 'https://linkedin.com/in/carlosruiz', 'es', 'Especialista en experiencia de usuario', 'user'),
('Elena', 'Torres', 'elenat', '1995-12-10', 'F', 'https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg', '$2b$10$W.yrUEZCciG1gC32FCeo3.XFxreWMVgoD1UgT/aCkpQ8eSvSMiYHK', 'elena.torres@tecla.local', 'Product Manager', 'Madrid, España', 'Administración de Empresas', 'https://linkedin.com/in/elenatorres', 'es', 'Gestión de productos digitales', 'user'),
('Miguel', 'Sánchez', 'miguels', '1987-03-18', 'M', 'https://avatars.steamstatic.com/0086700abf852fcd014d8fa02998ce4eca2babeb_full.jpg', '$2b$10$zxXXvrb6QuN0foB5qLEXGOI.5GNm8zrIt5Je.LxXFTcqKDSUHTjMO', 'miguel.sanchez@tecla.local', 'DevOps Engineer', 'Sevilla, España', 'Ingeniería de Sistemas', 'https://linkedin.com/in/miguelsanchez', 'es', 'Automatización e infraestructura cloud', 'user');

-- =============================================
-- RELACIONES DE AMISTAD
-- =============================================
INSERT INTO friends (sender_id, receiver_id, status) VALUES
(2, 3, 'accepted'),
(2, 5, 'accepted'),
(3, 2, 'accepted'),
(3, 4, 'accepted'),
(5, 2, 'accepted'),
(4, 3, 'pending');

-- =============================================
-- POSTS DE EJEMPLO
-- =============================================
INSERT INTO posts (text, image, post_date, like_number, user_id) VALUES
('¡Bienvenidos a Tecla! La red social para conectar con tu equipo.', NULL, NOW() - INTERVAL 2 DAY, 5, 2),
('Trabajando en nuevas funcionalidades. ¡Pronto tendremos novedades!', NULL, NOW() - INTERVAL 1 DAY, 3, 3),
('La colaboración en equipo es clave para el éxito de cualquier proyecto.', NULL, NOW() - INTERVAL 5 HOUR, 2, 4),
('Compartiendo consejos sobre desarrollo profesional en tecnología.', NULL, NOW() - INTERVAL 2 HOUR, 7, 5);

-- =============================================
-- CURSOS DE EJEMPLO
-- =============================================
INSERT INTO courses (user_id, course_name) VALUES
(2, 'Desarrollo Full Stack con React y Node.js'),
(2, 'Bases de Datos con MySQL'),
(3, 'Diseño de Interfaces y UX'),
(3, 'Prototipado con Figma'),
(4, 'Gestión de Productos Ágiles'),
(5, 'Docker y Kubernetes'),
(5, 'CI/CD con GitHub Actions');

-- =============================================
-- FEEDBACKS DE EJEMPLO
-- =============================================
INSERT INTO feedback (feedback_sender, feedback_receiver, content) VALUES
(3, 2, 'Excelente trabajo en el desarrollo del proyecto. Tu dedicación es impresionante.'),
(4, 2, 'Me gusta mucho tu enfoque profesional. ¡Sigue así!'),
(2, 3, 'Tus diseños han mejorado mucho la experiencia. Gracias.'),
(5, 4, 'Tu liderazgo ha sido fundamental para el equipo.');

-- =============================================
-- CONSULTAS DE EJEMPLO
-- =============================================
INSERT INTO querys (query, user_id, query_date, query_status) VALUES
('¿Cómo puedo cambiar mi foto de perfil?', 2, NOW() - INTERVAL 3 DAY, 'pending'),
('Tengo problemas para subir imágenes. ¿Pueden ayudarme?', 3, NOW() - INTERVAL 2 DAY, 'pending'),
('¿Es posible exportar mis datos?', 4, NOW() - INTERVAL 1 DAY, 'pending');

UPDATE querys SET response = 'Ve a Configuración > Perfil > Avatar para cambiar tu foto.', response_date = NOW(), admin_id = 1, query_status = 'responded' WHERE query_id = 1;

-- =============================================
-- NOTAS
-- =============================================
-- Contraseña de prueba para todos los usuarios: Grupo3!!
-- Admin: admin / admin@tecla.local
-- Usuarios: lauram, carlosr, elenat, miguels (con sus emails @tecla.local)
-- =============================================
