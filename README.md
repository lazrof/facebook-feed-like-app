# facebook-feed-like-app

Tech stack: 
- NodeJS
- Express Framework
- JSON Web Tokens 
- MongoDB
- Cloudinary(to save images)
- ReactJS
- Redux
- Redux Thunk
- React Semantic UI
- SASS

## Para correr el proyecto 

Se debe usar docker-compose

`docker-compose up --build`

## Credenciales

Credenciales de prueba por si son necesarias, igualmente en la vista para el registro
se pueden crear nuevos usarios.

email: `nunzio_ruffo@hotmail.com`
password : `123456`

## Rutas para en el backend
Funcionando en el puerto :8000

**Autenticación**

/login 
- POST : Ingreso al App, retorno de token

/users
- GET : Obtener un usuario
- POST : Registro de usuario

/posts
- GET       : Listado de posts relacionados a un usuario
- POST      : Crear un post relacionados a un usuario

/posts/:id
- GET       : Obtener un post
- PUT       : Editar un post
- DELETE    : Eliminar un post


## Rutas para en el frontend
Funcionando el Login y el Registro

- /  : Para Iniciar sesión

- /register   : Para el registro

- /posts       : Aterrizaje luego del registro
