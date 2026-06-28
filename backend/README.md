# Backend - AI Prompt Engineering Learning Hub

This backend implements the Week 06 requirements for backend and database development.

## Technology Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt password hashing

## Project Structure

```text
backend/
├── seed/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── tests/
├── .env.example
├── eslint.config.js
└── package.json
```

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment variables
   ```bash
   cp .env.example .env
   ```
3. Run backend
   ```bash
   npm run dev
   ```

## Deploy on Render (with MongoDB Atlas)

1. Create a MongoDB Atlas cluster and copy your connection string.
2. Create a Render **Web Service** from this repository and set:
   - Root Directory: `backend`
3. Use:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables in Render:
   - `MONGO_URI` (or `MONGODB_URI`) = Atlas connection string
   - `JWT_SECRET` = your JWT secret
   - `JWT_EXPIRES_IN` = token expiry (optional, defaults to `7d`)
   - `PORT` should not be set manually on Render (Render injects this automatically)
5. (Optional) use `/render.yaml` from the repository root for Blueprint deploy.
6. Deploy, then test API routes using the Render service URL.

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### User
- `GET /api/users/profile`
- `PUT /api/users/profile`

### Learning Resources
- `GET /api/resources`
- `GET /api/resources/:id`
- `POST /api/resources` (admin)
- `PUT /api/resources/:id` (admin)
- `DELETE /api/resources/:id` (admin)

### Prompt Challenges
- `GET /api/challenges`
- `GET /api/challenges/:id`
- `POST /api/challenges` (admin)
- `PUT /api/challenges/:id` (admin)
- `DELETE /api/challenges/:id` (admin)

## Scripts

- `npm run dev` - start with nodemon
- `npm start` - start production server
- `npm run lint` - run ESLint
- `npm test` - run tests
- `npm run seed` - seed sample data
