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
