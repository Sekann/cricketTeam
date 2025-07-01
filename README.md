# Proyecto Cricket Team - Madrid United

Repositorio con el backend y frontend para la gestión de jugadores y recursos del equipo Madrid United.

---

## Estructura del repositorio

- `/backend` — Backend con Spring Boot, Java, seguridad JWT y base de datos.
- `/frontend` — Frontend con Angular para consumir la API y mostrar la interfaz.

---

## Tecnologías

### Backend

- Java 17+
- Spring Boot
- Spring Security con JWT
- JPA / Hibernate
- PostgreSQL (o base configurada)
- Maven

### Frontend

- Angular 15+
- TypeScript
- Bootstrap (u otro framework CSS)

---

## Instalación y ejecución

### Backend

1. Configurar la base de datos en `/backend/src/main/resources/application.properties`
2. Ejecutar:
   ```bash
   cd backend
   ./mvnw spring-boot:run
La API correrá por defecto en http://localhost:8080

Frontend
Instalar dependencias:

bash
Copiar
Editar
cd frontend
npm install
Ejecutar el servidor de desarrollo:

bash
Copiar
Editar
ng serve
Por defecto correrá en http://localhost:4200

Endpoints disponibles (Backend)
GET /api/players — Listar todos los jugadores

GET /api/players/{id} — Obtener jugador por UUID

POST /api/players — Crear jugador

PUT /api/players/{id} — Actualizar jugador

DELETE /api/players/{id} — Eliminar jugador

Seguridad
JWT validado en backend con filtro personalizado (JwtAuthenticationFilter).

Actualmente los endpoints de players están abiertos, se agregarán controles de acceso más adelante.