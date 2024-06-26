# SomniAPI

API desplegada mediante render --> https://somniapi.onrender.com

Documentacion de Swagger --> https://somniapi.onrender.com/api-docs/

---

## Descripción del Proyecto

Este proyecto consiste en una API desarrollada en Node.js que brinda servicios para una aplicación web de venta de artículos de joyería, y de facil adaptecion para otro tipo de negocios de venta online. La API maneja diferentes colecciones en una base de datos MongoDB desplegada en MongoDB Atlas y la cual nos permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en las colecciones de usuarios, órdenes y artículos.

Se han utilizado diversas dependencias para facilitar el desarrollo y la gestión del proyecto. Desde el frontend, se realizan validaciones exhaustivas de datos para evitar solicitudes innecesarias y evitar sobrecargar el servidor. Asimismo, desde el servidor, se llevan a cabo validaciones para garantizar que los campos estén correctamente formateados según los modelos de MongoDB y prevenir la inserción de datos no válidos.

## Dependencias

A continuación, se detallan las dependencias utilizadas en el proyecto:
>  Dependencias de Desarrollo
>   - dotenv
>   - eslint
>   - nodemon

>Dependencias de Producción
>    - bcrypt
>    - common-errors
>    - cors
>    - dotenv
>    - express
>    - js-yamlgit 
>    - jsonwebtoken
>    - mongoose
>    - morgan
>    - node-mailjet
>    - nodemailer
>    - swagger-ui-express
>    - winston

## Colección de Usuarios

La colección de usuarios en nuestra base de datos MongoDB tiene las siguientes propiedades:

    _id: Campo autoasignado por MongoDB que actúa como identificador único para cada usuario.
    Nombre: Nombre del usuario.
    Apellidos: Apellidos del usuario.
    Email: Dirección de correo electrónico del usuario.
    Telefono: Telefono del usuario.
    Direccion
    Localidad
    Ciudad
    Codigo postal
    Contraseña
    Cart: Array que contiene los pedidos del usuario. Cada objeto en este array representa un pedido y contiene los siguientes campos:
        itemId: ID del artículo pedido.
        quantity: Cantidad del artículo.
        precio: Precio del artículo en el momento del pedido.
        fecha_pedido: Fecha en la que se realizó el pedido.

Esta estructura nos permite realizar operaciones de búsqueda de usuarios mediante filtros y proporciona la información necesaria para que los usuarios puedan ver su historial de pedidos.

#### Enrutador userRouter

El enrutador userRouter maneja las siguientes rutas relacionadas con los usuarios:

    GET /users/me: Devuelve la información del usuario actual autenticado.
    GET /users/list: Devuelve una lista de todos los usuarios.
    POST /users: Crea un nuevo usuario.
    POST /users/login: Inicia sesión de un usuario existente.
    PATCH /users/:id: Actualiza los datos de un usuario existente.
    DELETE /users/:id: Elimina un usuario existente.

Cada ruta del enrutador está protegida por el middleware checkToken, que verifica la validez del token de autenticación proporcionado en la solicitud.

#### Controladores de Usuarios
**getUserController**

    Descripción: Maneja la solicitud para obtener una lista de usuarios.
    Servicio: Utiliza getUsers del servicio de base de datos para obtener la lista de usuarios.

**createUserController**

    Descripción: Maneja la solicitud para crear un nuevo usuario.
    Servicio: Utiliza createUser del servicio de base de datos para crear el usuario. Además, encripta la contraseña del usuario antes de almacenarla en la base de datos.

**getUserMe**

    Descripción: Maneja la solicitud para obtener la información del usuario actual autenticado.
    Servicio: Utiliza getUserById del servicio de base de datos para obtener la información del usuario.

**updateUserController**

    Descripción: Maneja la solicitud para actualizar los datos de un usuario existente.
    Servicio: Utiliza métodos del modelo User y funciones del servicio de base de datos para actualizar los datos del usuario, incluido el carrito de compras.

**deleteUserController**

    Descripción: Maneja la solicitud para eliminar un usuario existente.
    Servicio: Utiliza deleteUser del servicio de base de datos para eliminar el usuario especificado.

Estos controladores ejecutan servicios que se encargan de enviar o recibir datos de la base de datos MongoDB. Los servicios interactúan directamente con la base de datos y encapsulan la lógica relacionada con la manipulación de datos.

## Colección de Artículos

La colección de artículos en nuestra base de datos MongoDB tiene las siguientes propiedades:

    _id: Campo autoasignado por MongoDB que actúa como identificador único para cada artículo.
    Tipo: Tipo de artículo (anillo, pulsera, gargantilla, pendiente, cadena, colgante).
    Material: Material del artículo (plata, oro, acero).
    Acabado: Acabado del artículo.
    Dimensiones
    Detalles: Breve descripcion del articulo.
    Unidades: Para que el usuario root pueda controlar el inventario
    Precio: Precio del artículo.
    Imagen: imagen codificada en base 64 para almacenar un String
    

Esta estructura nos permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección de artículos y facilita la búsqueda de artículos filtrandolos por diferentes prepiedades.

#### Enrutador articleRouter

El enrutador articleRouter maneja las siguientes rutas relacionadas con los artículos:

    GET /articles: Devuelve una lista de todos los artículos.
    GET /articles/get/:id: Devuelve un artículo específico por su ID.
    POST /articles: Crea un nuevo artículo.
    PATCH /articles/:id: Actualiza los datos de un artículo existente.
    DELETE /articles/:id: Elimina un artículo existente.
    GET /articles/rings: Devuelve una lista de anillos.
    GET /articles/bracelets: Devuelve una lista de pulseras.
    GET /articles/choker: Devuelve una lista de gargantillas.
    GET /articles/earrings: Devuelve una lista de pendientes.
    GET /articles/chains: Devuelve una lista de cadenas.
    GET /articles/pendants: Devuelve una lista de colgantes.
    GET /articles/search/:filtro: Realiza una búsqueda de artículos por tipo, material o detalles.

#### Controladores de Artículos

**getArticleController**

    Descripción: Maneja la solicitud para obtener una lista de todos los artículos.
    Servicio: Utiliza getArticles del servicio de base de datos para obtener la lista de artículos.

**getArticleByIDController**

    Descripción: Maneja la solicitud para obtener un artículo específico por su ID.
    Servicio: Utiliza getArticleByID del servicio de base de datos para obtener el artículo.

**createArticleController**

    Descripción: Maneja la solicitud para crear un nuevo artículo.
    Servicio: Utiliza createArticle del servicio de base de datos para crear el artículo.

**updateArticleController**

    Descripción: Maneja la solicitud para actualizar los datos de un artículo existente.
    Servicio: Utiliza updateArticle del servicio de base de datos para actualizar el artículo.

**deleteArticleController**

    Descripción: Maneja la solicitud para eliminar un artículo existente.
    Servicio: Utiliza deleteArticle del servicio de base de datos para eliminar el artículo.

**getRingsController, getBraceletsController, getChokerController, getEarringsController, getChainsController, getPendantsController**

    Descripción: Manejan las solicitudes para obtener una lista de artículos por tipo (anillos, pulseras, gargantillas, pendientes, cadenas, colgantes).
    Servicios: Utilizan métodos específicos del servicio de base de datos para obtener los artículos por tipo.

**getSearchController**

    Descripción: Maneja la solicitud para realizar una búsqueda de artículos filtrando por tipo, material o detalles.
    Servicio: Utiliza getSearch del servicio de base de datos para realizar la búsqueda de artículos.

## Colección de Órdenes

La colección de órdenes en nuestra base de datos MongoDB tiene las siguientes propiedades:

    _id: Campo autoasignado por MongoDB que actúa como identificador único para cada orden.
    Usuario: ID del usuario que realizó la orden. Referencia a la colección de usuarios.
    Articulos: Array de IDs de los artículos incluidos en la orden. Cada ID hace referencia a un artículo en la colección de artículos.
    Fecha: Fecha en la que se realizó la orden.
    Precio: Precio total de la orden.

Esta estructura nos permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección de órdenes y relacionar cada orden con su usuario correspondiente y los artículos incluidos en ella.

#### Enrutador orderRouter

El enrutador orderRouter maneja las siguientes rutas relacionadas con las órdenes:

    GET /orders: Devuelve una lista de todas las órdenes.
    GET /orders/order/:userId: Devuelve una lista de órdenes asociadas a un usuario específico.
    POST /orders: Crea una nueva orden.
    PATCH /orders/:id: Actualiza los datos de una orden existente.
    DELETE /orders/:id: Elimina una orden existente.

Cada ruta del enrutador está protegida por el middleware checkToken, que verifica la validez del token de autenticación proporcionado en la solicitud.

#### Controladores de Órdenes

**getOrdersController**

    Descripción: Maneja la solicitud para obtener una lista de todas las órdenes.
    Servicio: Utiliza getOrders del servicio de base de datos para obtener la lista de órdenes.

**createOrderController**

    Descripción: Maneja la solicitud para crear una nueva orden.
    Servicio: Utiliza createOrders del servicio de base de datos para crear la orden.

**updateOrderController**

    Descripción: Maneja la solicitud para actualizar los datos de una orden existente.
    Servicio: Utiliza updateOrder del servicio de base de datos para actualizar la orden.

**deleteOrderController**

    Descripción: Maneja la solicitud para eliminar una orden existente.
    Servicio: Utiliza deleteOrder del servicio de base de datos para eliminar la orden.

**getOrdersByIdController**

    Descripción: Maneja la solicitud para obtener una lista de órdenes asociadas a un usuario específico.
    Servicio: Utiliza getOrdersById del servicio de base de datos para obtener las órdenes asociadas al usuario especificado.

Estos controladores ejecutan servicios que se encargan de enviar o recibir datos de la base de datos MongoDB. Los servicios interactúan directamente con la base de datos y encapsulan la lógica relacionada con la manipulación de datos de las órdenes.