# sportPress-Front

Front-End del proyecto sportPress de Leonardo

---

**Características**

El proyecto trata de un portal de noticias deportivas comentables, que es gestionada por usuarios definidos con los siguientes roles:
- **administrador**: gestiona los roles de los usuarios.
- **editor**: selecciona y publica las noticias de los colaboradores.
- **colaborador**: crea noticias que tienen que ser supervisadas.
- **moderador**: puede eliminar comentarios indeseados.
- **usuario**: simplemente pueden comentar las noticias. Es el rol por defecto y el que se obtiene al registrarse.

---

**Tecnologías utilizadas**
- React
- Node
- PostgreSql
- Redux
- React-google-recaptcha
- Jsonwebtoken
- Jest

---

**Instrucciones de instalación**

Deberemos descargar el repositorio en nuestro ordenador con un `git clone`.

A continuación, instalaremos las dependencias del proyecto, con el comando `npm install`.

Y para finalizar, deberemos iniciar el proyecto con el comando `npm run start`.

---

**Usuarios**

Estas son las cuentas de prueba de los usuarios con diferentes roles.
Todas las contraseñas son 1234 .

| Nombre | Email | Rol |
|--------|----------|------|
| Ana    | ana@gmail.com    | usuario  |
| Juan   | elpachecos@gmail.com | moderador   |
| Paulo  | pvc@gmail.com | colaborador   |
| Pepe  | pepe@gmail.com | editor   |
| Leonardo  | leonardo@gmail.com | administrador   |

punto en el que me encuentro:
validación de contraseñas para que funcione con el auth0
quitar console.logs
mejorar el carrusel
el cambio de contraseña no funcionará con auth0
remaquetar primer nivel (noticias, login y registro) en mobile.first
el cambio de rol a admin no funciona
el token de auth0 no funcionará, ya que tenia una expiracion de una hora
las fechas no funcionan correctamente

