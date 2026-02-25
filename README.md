# 🎵 Song Server

Servidor web multipropósito construido con **Node.js** y **TypeScript** que sirve archivos estáticos y expone una REST API para gestionar una biblioteca de canciones, con persistencia en **PostgreSQL**.

---

## 🛠️ Tecnologías

- Node.js
- TypeScript
- PostgreSQL (`pg`)
- Nodemon (desarrollo)

---

## ✅ Requisitos

- Node.js >= 18
- PostgreSQL >= 14
- npm

---

## 📦 Instalación
```bash
git clone https://github.com/carlaclefig/song-server.git
cd song-server
npm install
```

---

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=songs_db
PORT=3000
```

---

## 🗄️ Base de datos

Ejecuta el siguiente SQL para crear la tabla necesaria en PostgreSQL:
```sql
CREATE TABLE songs (
  id     SERIAL PRIMARY KEY,
  title  VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album  VARCHAR(255),
  year   INT,
  genre  VARCHAR(100),
  url    TEXT
);
```

---

## 🚀 Uso

**Modo desarrollo** (con hot reload):
```bash
npm run dev
```

**Modo producción:**
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

---

## 📡 API Reference

Todos los endpoints parten de la ruta base `/api`.

Las respuestas siguen siempre esta estructura:
```json
// Éxito
{ "ok": true, "data": { ... } }

// Error
{ "error": true, "message": "descripción del error" }
```

### Endpoints

| Método     | Ruta           | Descripción                        |
|------------|----------------|------------------------------------|
| `GET`      | `/api/songs`   | Obtiene todas las canciones        |
| `POST`     | `/api/songs`   | Crea una nueva canción             |
| `GET`      | `/api/song/:id`| Obtiene una canción por ID         |
| `PUT/PATCH`| `/api/song/:id`| Edita una canción existente        |
| `DELETE`   | `/api/song/:id`| Elimina una canción                |

### Modelo `Song`
```ts
{
  id:     number;
  title:  string;
  artist: string;
  album:  string;
  year:   number;
  genre:  string;
  url?:   string;   // URL de reproducción (opcional)
}
```

### Ejemplos

**Crear canción**
```http
POST /api/songs
Content-Type: application/json

{
  "title": "Blinding Lights",
  "artist": "The Weeknd",
  "album": "After Hours",
  "year": 2019,
  "genre": "Synthpop",
  "url": "https://ejemplo.com/blinding-lights.mp3"
}
```

**Editar canción**
```http
PUT /api/song/1
Content-Type: application/json

{
  "title": "Blinding Lights (Edit)",
  "year": 2020
}
```

### Filtros por query params

El endpoint `GET /api/songs` acepta filtros opcionales que se pueden combinar:

| Parámetro | Ejemplo                          | Descripción                              |
|-----------|----------------------------------|------------------------------------------|
| `title`   | `/api/songs?title=blinding`      | Filtra por título (insensible a mayúsc.) |
| `artist`  | `/api/songs?artist=weeknd`       | Filtra por artista                       |
| `album`   | `/api/songs?album=after`         | Filtra por álbum                         |
| `year`    | `/api/songs?year=2019`           | Filtra por año exacto                    |
| `genre`   | `/api/songs?genre=pop`           | Filtra por género                        |

Ejemplo combinado:
```
GET /api/songs?genre=pop&year=2019
```

---

## 🗂️ Servidor de archivos estáticos

El servidor también sirve archivos estáticos desde la carpeta `public/`.
```
GET /ruta/del/archivo.ext
```

- **200** — Archivo encontrado y retornado con el `Content-Type` correcto
- **404** — Archivo no encontrado, se sirve `404.html`
- **500** — Error interno, respuesta `{ "error": "mensaje" }`
- Archivos **mayores a 4MB** se sirven mediante streams
- Soporta la cabecera `Range` para streaming parcial de audio/video (`206 Partial Content`)

---

## 🖥️ Despliegue con interfaz gráfica

Si quieres usar este servidor con un frontend visual, puedes clonar el repositorio complementario:

👉 **[song-frontend](https://github.com/carlaclefig/song-frontend)**

Sigue las instrucciones de su README para apuntarlo a la URL de este servidor.

---

## 📁 Estructura del proyecto
```
song-server/
├── public/           # Archivos estáticos
├── src/
│   ├── db/           # Conexión a PostgreSQL
│   ├── models/       # Tipos TypeScript (Song)
│   ├── repositories/ # Capa de acceso a datos
│   └── ...
├── .env              # Variables de entorno (no commitear)
├── tsconfig.json
└── package.json
```