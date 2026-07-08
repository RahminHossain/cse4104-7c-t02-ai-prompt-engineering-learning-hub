- **Login (`POST /api/auth/login`)**: The frontend sends the `email` and `password`. The backend verifies the credentials and, if correct, generates a JWT.

**Response Structure (On Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
