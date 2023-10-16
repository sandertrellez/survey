
# Survey App

La aplicación "Survey" es una plataforma de encuestas desarrollada en Adonis.js que te permite crear y responder encuestas.

Se puede ejecutar con Docker(Recomendado) o de forma manual.


## Ejecución con Docker

### Requisitos

- Docker
- Docker Compose


1. Clona este repositorio:

   ```bash
   git clone https://github.com/sandertrellez/survey.git
   cd survey
   ```

2. Copia el archivo de entorno y configura tus variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus configuraciones específicas, como la configuración de la base de datos.

3. Ejecuta la aplicación utilizando Docker Compose:

   ```bash
   docker-compose up --build
   ```

   Esto creará contenedores para la aplicación y la base de datos MariaDB.
   
   La aplicación estará disponible en http://localhost:3333.
   
    Nota: Sólo para efectos de prueba ya el contenedor ejecuta las migraciones y seed necesarias



# Instalar sin Docker
## Requisitos
- Node.js (versión 18.18.0 recomendada)
- npm (versión 10.2.0 recomendada)
- MariaDB (o cualquier otra base de datos compatible)

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/sandertrellez/survey.git
   cd survey
   ```

2. Copia el archivo de entorno y configura tus variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus configuraciones específicas, como la configuración de la base de datos.

3. Instala las dependencias de Node.js:

   ```bash
   npm install
   ```

4. Ejecuta las migraciones de la base de datos para crear las tablas:

   ```bash
   node ace migration:run
   ```

5. Genera datos de ejemplo en la base de datos:

   ```bash
   node ace db:seed
   ```

6. Inicia el servidor de desarrollo:

   ```bash
   node ace serve
   ```

   La aplicación estará disponible en http://localhost:3333.


## Licencia

Este proyecto está bajo licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
