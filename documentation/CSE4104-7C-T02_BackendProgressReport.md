# CSE4104-7C-T02 Backend Progress Report

## Project Title
AI Prompt Engineering Learning Hub

## Team Information
- Team: CSE4104-7C-T02
- Repository: https://github.com/sezanX/Teem-01

## Backend Technology Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt password hashing

## Database Design Summary
Implemented MongoDB collections:
- users
- learningresources
- promptchallenges

Relationships are maintained using ObjectId references (`createdBy`) from learning resources and challenges to users.

## Implemented APIs
### Authentication APIs
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### User APIs
- GET `/api/users/profile`
- PUT `/api/users/profile`

### Project-Specific APIs
#### Learning Resources
- GET `/api/resources`
- GET `/api/resources/:id`
- POST `/api/resources` (admin)
- PUT `/api/resources/:id` (admin)
- DELETE `/api/resources/:id` (admin)

#### Prompt Challenges
- GET `/api/challenges`
- GET `/api/challenges/:id`
- POST `/api/challenges` (admin)
- PUT `/api/challenges/:id` (admin)
- DELETE `/api/challenges/:id` (admin)

## Authentication Workflow
1. User registers or logs in.
2. Server verifies credentials and issues JWT.
3. Client sends JWT in `Authorization: ****** header.
4. Protected routes validate token and role before granting access.

## Current Development Progress
- Backend scaffold complete
- Database models and relationships complete
- Authentication and authorization complete
- Core APIs complete
- Validation and centralized error handling complete
- Postman collection prepared

## API Testing
- Postman collection exported at:
  - `/home/runner/work/Teem-01/Teem-01/postman/CSE4104-7C-T02_APICollection.json`

## Screenshots Checklist (to attach in final PDF)
- [ ] Database tables/collections
- [ ] API testing success/error responses
- [ ] Authentication process
- [ ] Backend folder structure
- [ ] GitHub repository activity
