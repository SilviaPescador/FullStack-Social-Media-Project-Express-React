# Proyecto Final: Bootcamp Tecla - Red Social Fullstack

Red social desarrollada con **Express** en el backend y **React** (migrado a Vite) en el frontend.

> Proyecto de fin de Bootcamp (2023), modernizado en marzo de 2026 con migración de dependencias, gestor de paquetes y herramientas de build.

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 18, Redux Toolkit 2, React Router 6, Bootstrap 5, Vite |
| **Backend** | Express 4, MySQL2, JWT, bcrypt |
| **Tooling** | pnpm, GitHub Actions (audit + build), Node >= 24 |

## Requisitos previos

- **Node.js** >= 24 (ver `.nvmrc`)
- **pnpm** >= 10
- **MySQL** (base de datos local)

## Instalación rápida

Desde la raíz del proyecto:

```bash
pnpm install        # instala dependencias de backend y frontend
pnpm dev            # levanta backend (puerto 3000) y frontend (puerto 3001) en paralelo
```

O por separado:

```bash
pnpm dev:backend    # solo backend
pnpm dev:frontend   # solo frontend
```

## Backend - Express

### Inicialización

```bash
cd Backend
pnpm install
pnpm dev
```

### API (manual)

![Api](Backend/README.md)

### Estructura

El servidor es una API REST creada con Express Generator y utiliza Node.js. La estructura del backend se compone de las siguientes carpetas:

- `bin`: Contiene el archivo `www` donde se establece la configuración para la escucha del servidor en un puerto específico.
- `db`: Aquí se encuentra la conexión con la base de datos SQL mediante `mysql2/promise`, creando un pool de conexiones.
- `lib`: Contiene varios archivos con funcionalidades utilizadas en diferentes partes del servidor, así como los middlewares para la verificación de datos provenientes del cliente y la autenticación.
- `controllers`: Controladores para cada recurso de la API (auth, users, posts, friends, feedbacks, courses, querys).
- `routes`: Se definen las diferentes rutas del servidor utilizando `express.router()`.
- `test`: Tests de autenticación con Mocha y Chai.

### Dependencias destacadas

- `cors`: Permitir solicitudes cross-origin.
- `jsonwebtoken`: Autenticación mediante JWT.
- `bcrypt`: Cifrado de contraseñas.
- `dayjs`: Manejo de fechas y tiempos (reemplaza a moment.js).
- `nodemon`: Reinicio automático en desarrollo.

### Tests

```bash
cd Backend
pnpm test
```

## Frontend - React (Vite)

### Inicialización

```bash
cd frontend-react
pnpm install
pnpm dev
```

### Build de producción

```bash
pnpm build
pnpm preview
```

### Estructura

El cliente se desarrolló en React con Vite como bundler (migrado desde Create React App).

- `src/components/`: Componentes reutilizables (App, Navbar, AvatarLink, InputField, etc.)
- `src/pages/`: Vistas principales (Home, Feed, Profile, Friends, Admin, AccountSettings)
- `src/services/`: Servicios HTTP con Axios para comunicación con la API
- `src/store/`: Redux Toolkit (authSlice, searchSlice, feedbackSlice) con `createAsyncThunk`
- `src/utils/`: Funciones de uso común

### Estilos

Bootstrap 5 como framework CSS principal, con estilos personalizados y media queries.

## Decisiones administrativas del proyecto

- **Requisitos de contraseña:** Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
- **Modificación de datos de usuario:** El usuario puede modificar cualquiera de sus datos. Al cambiar datos personales se redirige al login (excepto biografía y cursos).
- **Eliminación de cuenta:** Eliminación en cascada de todas las referencias al user_id.
- **Login:** El usuario puede iniciar sesión con email o nickname.
- **Exportación de datos:** Panel de administración con exportación a Excel mediante ExcelJS.

## Seguridad y CI

- **Auditoría de dependencias:** `pnpm audit` con 0 vulnerabilidades conocidas.
- **GitHub Actions:** Workflow automático de auditoría de seguridad y build en cada push/PR, más ejecución semanal programada.
- **pnpm:** Gestor de paquetes con resolución estricta de dependencias.

## Modernización (Marzo 2026)

Cambios realizados para eliminar las 52 vulnerabilidades de seguridad detectadas por Dependabot:

| Cambio | Motivo |
|--------|--------|
| Create React App → **Vite** | CRA descontinuado, 36 vulnerabilidades en su árbol de dependencias |
| `xlsx` → **ExcelJS** | SheetJS abandonado en npm, vulnerabilidades sin parche |
| `mysql2-promise` → **mysql2/promise** (nativo) | Paquete abandonado, dependía de mysql2 antiguo con bn.js vulnerable |
| `moment` → **dayjs** | moment.js en modo mantenimiento |
| npm → **pnpm** | Resolución estricta de dependencias, mejor rendimiento |
| Redux Toolkit **1.x → 2.x** | Modernización, mejoras de rendimiento |
| react-redux **8.x → 9.x** | Compatibilidad con RTK 2 |
| react-router-dom **6.11 → 6.28+** | Fix de vulnerabilidad XSS (GHSA-2w69-qvjg-hvjx) |
| Añadido **GitHub Actions** | Auditoría automática de seguridad semanal |
| Añadido **.nvmrc** + `engines` | Versión de Node explícita |

## Posibles mejoras futuras

- Migrar a React 19 + React Router 7
- Migrar a Express 5
- Añadir Vitest para testing del frontend
- Implementar expiración de sesión (JWT con TTL)
- Login con OAuth (Google)
- Soporte de multimedia en publicaciones
- Mensajes privados entre usuarios
- CRUD completo de administrador
