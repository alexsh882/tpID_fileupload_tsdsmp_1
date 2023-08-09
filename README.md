# GALERÍA DE IMÁGENES CON CONEXIÓN A CLOUDINARY

## Trabajo Práctico de Desarrollo e Investigación

El objetivo de este trabajo es invertigas, diseñar y desarrollar un servidor
utilizando Node.js y Express, junto con el motor de plantillas EJS, para crear un sistema
de gestión de imágenes con operaciones CRUD (Crear, Leer, Actualizar y Borrar).
Además, se busca integrar el servicio Cloudinary para el almacenamiento y
manipulación de imágenes. El proyecto también involucra la implementación de una
base de datos MySQL para el seguimiento y almacenamiento de información
relacionada con las imágenes, incluida la compatibilidad con la librería expressfileupload
para la carga de archivos.



Instalaciones necesarias:

Dentro del directorio del proyecto ejecutar:
```bash
npm install
```

>> ## Requiere de una base de datos MySQL.

Variables de entorno:
```bash
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DIALECT=
```

Configurar en el package.json
```bash
 "scripts": {
    "dev" : "nodemon app.js"
  }
```

Y para ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```