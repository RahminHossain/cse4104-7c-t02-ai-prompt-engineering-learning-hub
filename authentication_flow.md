# Backend API Authentication Flow

This document outlines the authentication flow between the frontend application and the backend API for the AI Prompt Hub platform.

## 1. User Registration & Login
When a user wants to access the platform, they must authenticate:

- **Registration (`POST /api/auth/register`)**: The frontend sends the user's `name`, `email`, `password`, and `role`. The backend hashes the password using `bcrypt`, creates the user in the MongoDB database, and generates a JSON Web Token (JWT).
- **Login (`POST /api/auth/login`)**: The frontend sends the `email` and `password`. The backend verifies the credentials and, if correct, generates a JWT.

**Response Structure (On Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "60d5ecb8b392...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

## 2. Token Storage & State Management
Upon receiving the response, the frontend state manager (Redux `authSlice`) performs the following actions:
1. Updates the global application state to indicate the user is authenticated.
2. Persists the `token` and `user` object in the browser's `localStorage` to maintain the session across page reloads.

## 3. Authenticated Requests (Axios Interceptors)
To access protected backend routes (e.g., fetching a user profile, saving a bookmark, or accessing the admin panel), the frontend must prove its identity.
This is handled automatically by an **Axios Request Interceptor** located in `frontend/src/services/api.js`.

Before any HTTP request is sent, the interceptor checks `localStorage` for the token. If found, it attaches it to the request headers:
```http
Authorization: Bearer <token>
```

## 4. Backend Verification (Middleware)
When the backend receives a request for a protected route, it passes through the `authenticate` middleware:
1. The middleware extracts the token from the `Authorization` header.
2. It verifies the token's validity using `jsonwebtoken` and the server's secret key.
3. If valid, it decodes the payload, fetches the user from the database, and attaches the user document to the request object (`req.user = user`).
4. The request proceeds to the actual controller.

If the token is missing, invalid, or expired, the middleware intercepts the request and responds with a `401 Unauthorized` status.

## 5. Handling Session Expiration & Logout
- **Global Error Handling:** An Axios Response Interceptor listens for all incoming responses. If it detects a `401 Unauthorized` error from any API endpoint, it immediately triggers a global logout action, clearing `localStorage` and redirecting the user to the login screen.
- **Manual Logout (`POST /api/auth/logout`)**: The user clicks "Logout", which triggers a Redux action to clear the `token` and `user` from memory and `localStorage`.

## 6. Role-Based Authorization
For specific routes (like the Admin Panel), an additional `authorizeRoles` middleware is used on the backend. After `authenticate` verifies the user's identity, `authorizeRoles('admin')` checks if `req.user.role === 'admin'`. If not, it returns a `403 Forbidden` response.
