# Full-Stack CRUD App

This is a full-stack CRUD (Create, Read, Update, Delete) application with a React frontend and a Node.js/Express backend using MongoDB.  Users can register, login, and manage posts  with JWT token authentication

## Features

- JWT Token for authentication
- Modern UI/UX  & responsiveness
- support CRUD operations

## Folder Structure

```
my-crud-app/
├── client/                     # React frontend
│   ├── public/
│   └── src/                    # Components, pages, hooks, etc.
│       ├── components/
│       ├── pages/
│       ├── utils/
│       └── App.js
│
├── server/                     # Node.js backend
│   ├── config/                 # DB connection or environment config
│   ├── controllers/            # Controller logic (CRUD, auth, etc.)
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express route files
│   ├── server.js               # Entry point for backend
│   └── .env                    # Environment variables (ignored in Git)
│
├── crudApp.postman.json        # 🧩 Postman collection with all API routes
└── README.md                   # Project documentation
```

# Setup Instructions

## Clone the Repository

```shellscript
git clone https://github.com/kakuPandeyy/assignmentCrud.git
cd assignmentCrud
```

## Setup Backend

```shellscript
cd server
npm install
notepad .env # create .env file  you can paste it blow also

```

## Environment Variables (.env)

```bash
MONGO_URL=mongodb://127.0.0.1:27017/crudappTest
JWT_SECRET=your_secret
HOST_URL = http://localhost:5173
PORT = 5000
```

## Setup Frontend

```shellscript
cd ../client
npm install

```


## Restart frontedend and backend

```shellscript
npm start  # /server
npm run dev # /client
```

### listen on

```
http://localhost:5173
```


## Demo Screenshots

### 🏠 login Page
![Login Page](./client/public/login.png)

### 📝 register Page
![Register Post](./client/public/register.png)

### 🔐 feed Page
![Feed Page](./client/public/feed.png)
![Feed Page](./client/public/feed2.png)



# API Documentation

### Authentication Routes

| Method | Endpoint           | Description                        | Request Body Example                                                    |
| ------ | ------------------ | ---------------------------------- | ----------------------------------------------------------------------- |
| POST   | /api/auth/register | Register a new user give JWT token | `{ "name": "user1", "email": "user1@mail.com", "password": "pass123" }` |
| POST   | /api/auth/login    | Login a user and get JWT token     | `{ "email": "user1@mail.com", "password": "pass123" }`                  |

**Response (login and Register):**

```json
{
    "message": "Login successful",
    "token": "user_jwt_token",
    "user": {
        "id": "68e89f77247ece424b11fce3",
        "email": "ram@gmail.com"
    }
}
```

### Post Routes (Require Authentication)

| Method | Endpoint            | Description               | Request Body Example              | Headers                         |
| ------ | ------------------- | ------------------------- | --------------------------------- | ------------------------------- |
| GET    | /api/getPosts       | Get all posts             | None                              | `Authorization: Bearer <token>` |
| GET    | /api/user/:id       | Get a specific user by ID | None                              | `Authorization: Bearer <token>` |
| POST   | /api/createPost     | Create a new post         | `{ "message": "MyMessage" }`      | `Authorization: Bearer <token>` |
| PUT    | /api/updatePost/:id | Update a post by ID       | `{ "newmessage": "newMyMessage"}` | `Authorization: Bearer <token>` |
| DELETE | /api/deletePost/:id | Delete a post by ID       | None                              | `Authorization: Bearer <token>` |

**Notes:**

- Replace `:id` with the actual user or post ID.
- `<token>` should be the JWT received from the login endpoint.

**Response (/getPosts):**

```json
[
    {
        "_id": "68ea20bb66c36bde051c4f90",
        "message": "hello\n",
        "postedBy": "68e89f77247ece424b11fce3",
        "createdAt": "2025-10-11T09:17:47.017Z",
        "updatedAt": "2025-10-11T09:17:47.017Z",
        "__v": 0
    },
    {
        "_id": "68ea20b666c36bde051c4f8c",
        "message": "kaefd",
        "postedBy": "68e89f77247ece424b11fce3",
        "createdAt": "2025-10-11T09:17:42.608Z",
        "updatedAt": "2025-10-11T09:17:42.608Z",
        "__v": 0
    },
    {
        "_id": "68e9eb8f0209cfc83467978f",
        "message": "kaku ",
        "postedBy": "68e801120507f1edc9490468",
        "createdAt": "2025-10-11T05:30:55.176Z",
        "updatedAt": "2025-10-11T05:30:55.176Z",
        "__v": 0
    }
]
```

**Response (/createPosts):**

```json
{
    "message": "Post created successfully",
    "post": {
        "message": "kdkd",
        "postedBy": "68e89f77247ece424b11fce3",
        "_id": "68ea212a66c36bde051c4f9c",
        "createdAt": "2025-10-11T09:19:38.665Z",
        "updatedAt": "2025-10-11T09:19:38.665Z",
        "__v": 0
    }
}
```

**Response (/updatePost):**

```json
{
    "_id": "68ea212a66c36bde051c4f9c",
    "message": "kdkdddd",
    "postedBy": "68e89f77247ece424b11fce3",
    "createdAt": "2025-10-11T09:19:38.665Z",
    "updatedAt": "2025-10-11T09:21:15.729Z",
    "__v": 0
}
```

**Response (/deletePost):**

```json
{
  {"message":"Post deleted successfully"}
}
```

# Scaling Frontend-Backend Integration for Production

### Frontend Deployment

- Build the React app for production using `npm run build`.
- Host it on platforms like Vercel, Netlify, or AWS S3 + CloudFront for fast content delivery.

### Backend Deployment

- Deploy Node.js backend on a server or cloud platform like Heroku, AWS EC2, or DigitalOcean.
- Use process managers like PM2 or Docker containers to ensure reliability.

### Database

- Use MongoDB Atlas or a production-grade MongoDB server with proper indexes for fast queries.
- Enable replication and backups to prevent data loss.

### API & Frontend Integration

- Serve API via HTTPS using a domain name.
- Frontend calls backend APIs using environment variables for base URLs.
- Implement CORS properly.

### Scaling

- Use load balancers to distribute traffic if app grows.
- Use CDN for static assets (React build files) to reduce latency.
- Use caching (Redis or in-memory cache) for frequently requested data.

### Security & Performance

- Enable JWT authentication for secure access.