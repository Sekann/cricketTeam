🏏 Cricket Team - Madrid United
Proyecto web para la gestión y visualización del equipo de cricket Madrid United, incluyendo jugadores, partidos, noticias y más.

⚠️ Actualmente, el proyecto utiliza Supabase como backend para producción. Sin embargo, se desarrolló un backend completo en Spring Boot, disponible en este repositorio, aunque no integrado en el entorno final por temas de despliegue.

📁 Estructura del Repositorio
/
├── backend # Backend con Spring Boot, Java, seguridad JWT y acceso a datos
└── frontend # Frontend en Angular que consume los datos desde Supabase

🚀 Tecnologías Utilizadas
🔙 Backend (Spring Boot)
Java 17+

Spring Boot

Spring Security + JWT (JSON Web Tokens para seguridad)

JPA / Hibernate (para persistencia de datos)

PostgreSQL (base de datos relacional)

Maven (gestor de dependencias y construcción)

🔜 Frontend (Angular)
Angular 15+

TypeScript

SCSS personalizado (inspirado en Bootstrap para un estilo moderno)

Angular Standalone Components (para una arquitectura modular)

⚙️ Instalación y Ejecución
Backend (opcional)
💡 No requerido para desplegar la web actualmente, pero disponible para desarrollo local.

Clona este repositorio:

git clone <URL_DE_TU_REPOSITORIO>

Configura src/main/resources/application.properties con los detalles de tu base de datos (PostgreSQL u otra).

Ejecuta la aplicación Spring Boot desde la terminal:

cd backend
./mvnw spring-boot:run

La API estará activa por defecto en: http://localhost:8080

Frontend
Navega al directorio del frontend:

cd frontend

Instala las dependencias del proyecto:

npm install

Ejecuta el servidor de desarrollo de Angular:

ng serve

La aplicación web será accesible por defecto en: http://localhost:4200

🌐 Backend API Endpoints (Spring Boot)
Estos son los endpoints expuestos por el backend de Spring Boot (si decides usarlo localmente):

GET     /api/players        # Listar todos los jugadores
GET     /api/players/{id}   # Detalle de un jugador
POST    /api/players        # Crear nuevo jugador
PUT     /api/players/{id}   # Actualizar jugador
DELETE  /api/players/{id}   # Eliminar jugador

🔐 Seguridad con JWT: La implementación de seguridad con JWT ya está presente en el backend. Actualmente, por simplicidad en el desarrollo local, los endpoints pueden estar configurados sin restricción explícita en ciertos perfiles.

🗃️ Producción: Base de datos en Supabase
Para facilitar el despliegue y la gestión de datos en el entorno final, la aplicación frontend consume directamente la base de datos de Supabase. Desde ahí se cargan dinámicamente los siguientes datos:

Jugadores

Noticias

Partidos

Contactos (formulario de contacto)

📸 Funcionalidades del Proyecto
El proyecto web ofrece las siguientes características principales:

✅ Listado y detalle de jugadores: Explora el roster completo del equipo con perfiles individuales de cada jugador.
✅ Noticias con vista extendida: Mantente al día con las últimas novedades y profundiza en los artículos.
✅ Gestión de partidos: Visualiza tanto los partidos pasados con sus resultados como los próximos encuentros.
✅ Formulario de contacto: Permite a los usuarios enviar mensajes, con los datos almacenados en Supabase.
✅ Animaciones y estilo responsive: Una experiencia de usuario fluida y adaptable a cualquier tamaño de pantalla.
✅ Interfaz moderna y dinámica: Un diseño atractivo y con elementos visuales actuales.

🔗 Autor y Créditos
Proyecto realizado por Sekandar como parte de un proyecto personal.
