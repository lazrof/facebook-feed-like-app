# fb-like-test

**Prueba Tecnica NodeJS y ReactJS**

Nunzio Ruffo

Tecnologías: 
- NodeJS
- Express Framework
- JSON Web Tokens 
- MongoDB
- Cloudinary(para servicio de imagenes)
- ReactJS
- Redux
- Redux Thunk
- SASS

## Para correr el proyecto 

Se debe usar docker-compose

`docker-compose up`

## Credenciales

Credenciales de prueba por si son necesarias, igualmente en la vista para el registro
se pueden crear nuevos usarios.

email: `nunzio_ruffo@hotmail.com`
password : `123456`

## Rutas para el backend
Funcionando en el puerto :8000

/users
- POST : Registro de usuario

/posts
- GET       : Listado de Posts Relacionados a un usuario
- POST      : Crear un post

/posts/:id
- GET       : Obtener un solo post
- PUT       : Editar un post
- DELETE    : Eliminar un post

Autenticación

/login 
- POST : Ingreso al App


## Frontend 
Funcionando el Login y el Registro

- /  : Para Iniciar sesión

- /register   : Para el registro

- /posts       : Aterrizaje luego del registro
