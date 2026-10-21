# URL Shortener

A full-stack **URL Shortener** built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to convert long URLs into short, shareable links, manage their shortened URLs, and track link clicks.

The application supports both guest users and registered users. Guests can shorten URLs without creating an account, while authenticated users can create custom short links and manage their URLs through a personalized dashboard.

## Features

- **URL Shortening:** Convert long URLs into short, shareable links.
- **User Authentication:** Register and log in using email and password.
- **Secure Authentication:** Password hashing with bcrypt and JWT-based authentication using HTTP-only cookies.
- **Guest Access:** Create shortened URLs without signing up.
- **Custom Short URLs:** Allow authenticated users to choose custom URL slugs.
- **User Dashboard:** View and manage previously created URLs.
- **Click Tracking:** Track the number of times a shortened URL is accessed.
- **URL Redirection:** Redirect short links to their original destinations.
- **Protected Routes:** Restrict user dashboard access to authenticated users.
- **Responsive UI:** A clean user interface styled with Tailwind CSS.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- TanStack Router
- TanStack Query
- Redux Toolkit
- Axios

### Backend

- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- cookie-parser
- CORS
- dotenv
- nanoid

## Project Structure

```text
geetanshu17-tech-url-shortner/
├── BACKEND/
│   ├── app.js
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── config.js
│       │   └── mongo.config.js
│       ├── controller/
│       │   ├── auth.controller.js
│       │   ├── short_url.controller.js
│       │   └── user.controller.js
│       ├── dao/
│       │   ├── short_url.js
│       │   └── user.dao.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── short_url.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── short_url.route.js
│       │   └── user.route.js
│       ├── services/
│       │   ├── auth.service.js
│       │   └── short_url.service.js
│       └── utils/
│           ├── attachUser.js
│           ├── errorHandler.js
│           ├── helper.js
│           └── tryCatchWrapper.js
└── FRONTEND/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        ├── routing/
        ├── store/
        ├── utils/
        ├── App.jsx
        ├── RouteLayout.jsx
        ├── index.css
        └── main.jsx
```

## Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) — use a version compatible with Vite 7.
- npm — included with Node.js.
- [MongoDB](https://www.mongodb.com/) — local installation or MongoDB Atlas.
- [Git](https://git-scm.com/) — for cloning the repository.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/geetanshu17-tech/URL-Shortner
cd geetanshu17-tech-url-shortner
```


### 2. Set up the backend

Navigate to the backend directory and install dependencies:

```bash
cd BACKEND
npm install
```

Create a `.env` file inside the `BACKEND` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
APP_URL=http://localhost:3000
NODE_ENV=development
```

Configure the environment variables with your actual values.

For a local MongoDB installation, the connection string can look like this:

```env
MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
```

**Important:** Never commit your `.env` file or expose your database credentials and JWT secret publicly.

Start the backend development server:

```bash
npm run dev
```

The backend runs at `http://localhost:3000` with the configuration shown above.

### 3. Set up the frontend

Open a new terminal from the project root and navigate to the frontend directory:

```bash
cd FRONTEND
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in your terminal, usually:

```text
http://localhost:5173
```

The frontend uses Vite's development proxy to forward `/api` requests to the backend at `http://localhost:3000`.

## API Documentation

The backend exposes REST API endpoints for authentication, URL creation, redirection, and user URL management.

### Authentication APIs

Base path: `/api/auth`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Not required |
| POST | `/api/auth/login` | Log in an existing user | Not required |
| POST | `/api/auth/logout` | Log out the current user | Not required |
| GET | `/api/auth/me` | Get the current authenticated user | Required |

#### Register a user

**Request:** `POST /api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password"
}
```

#### Log in

**Request:** `POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "your_password"
}
```

A successful login sets an HTTP-only `accessToken` cookie.

### URL APIs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/create` | Create a shortened URL | Optional |
| GET | `/:id` | Redirect to the original URL | Not required |

#### Create a short URL

**Request:** `POST /api/create`

```json
{
  "url": "https://www.example.com"
}
```

Example response:

```json
{
  "shortUrl": "http://localhost:3000/abc1234"
}
```

The returned slug is illustrative. The actual generated value will vary.

#### Create a custom short URL

Authenticated users can optionally provide a custom slug:

```json
{
  "url": "https://www.example.com",
  "slug": "my-custom-link"
}
```

Example shortened URL:

```text
http://localhost:3000/my-custom-link
```

Custom slugs must be unique.

#### Redirect to the original URL

Open a generated short URL in your browser:

```text
http://localhost:3000/abc1234
```

The backend looks up the corresponding URL, increments its click counter, and redirects the browser to the original destination.

### User URLs API

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/user/urls` | Retrieve URLs belonging to the authenticated user | Required |

**Request:** `GET /api/user/urls`

The endpoint returns the authenticated user's shortened URLs, including their original destinations, short slugs, and click counts.

> **Note:** The request and response examples are illustrative. Refer to the backend implementation for the exact response structure and validation rules.

## How It Works

1. A user enters a long URL in the frontend.
2. The frontend sends a request to the Express.js backend.
3. The backend generates a short identifier using `nanoid` and stores the URL mapping in MongoDB.
4. If the user is authenticated, the shortened URL is associated with their account.
5. When someone visits the short URL, the backend retrieves the original destination and increments the click counter.
6. The browser is redirected to the original URL.
7. Authenticated users can access their saved URLs and click statistics through the dashboard.

## Authentication and Security

The application uses several mechanisms to protect user accounts and authenticated endpoints:

- **Password Hashing:** Passwords are hashed using bcrypt before being stored.
- **JWT Authentication:** JSON Web Tokens are used to identify authenticated users.
- **HTTP-Only Cookies:** Authentication tokens are stored in HTTP-only cookies.
- **Protected Endpoints:** Authentication middleware restricts access to protected resources.
- **CORS Configuration:** Cross-origin requests are configured to support the frontend development origin and credentials.

For production deployment, configure the frontend origin, cookie security settings, HTTPS, database access permissions, and environment variables appropriately. HTTP-only cookies help prevent JavaScript from reading authentication tokens, but they do not replace other security measures such as CSRF protection where applicable.

## Available Scripts

### Backend

Run these commands inside the `BACKEND` directory.

| Command | Description |
|---|---|
| `npm install` | Install backend dependencies |
| `npm run dev` | Start the development server using the configured script |
| `npm test` | Placeholder test script; automated tests are not configured yet |

### Frontend

Run these commands inside the `FRONTEND` directory.

| Command | Description |
|---|---|
| `npm install` | Install frontend dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Future Improvements

Potential improvements for future versions include:

- [ ] Add URL expiration and deletion functionality.
- [ ] Generate QR codes for shortened URLs.
- [ ] Introduce detailed click analytics and visual reports.
- [ ] Implement rate limiting and stronger URL validation.
- [ ] Improve custom slug validation and conflict handling.
- [ ] Add automated backend and frontend tests.
- [ ] Document production deployment.
- [ ] Implement password reset and email verification.
- [ ] Further improve accessibility and mobile responsiveness.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request.

## License

No license has been specified for this project yet. If you intend to distribute the project or allow others to reuse its code, consider adding an appropriate license file.

---

**Built with the MERN stack.**
