# Database Design Summary (MongoDB)

## Collections

### users
- `_id` (ObjectId, primary key)
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, bcrypt hash)
- `role` (Enum: `student`, `admin`)
- `bio` (String)
- `createdAt`, `updatedAt`

### learningresources
- `_id` (ObjectId, primary key)
- `title` (String, required)
- `description` (String, required)
- `level` (Enum: `beginner`, `intermediate`, `advanced`)
- `category` (String, required)
- `createdBy` (ObjectId, ref: users)
- `isPublished` (Boolean)
- `createdAt`, `updatedAt`

### promptchallenges
- `_id` (ObjectId, primary key)
- `title` (String, required)
- `promptTask` (String, required)
- `expectedOutcome` (String, required)
- `difficulty` (Enum: `easy`, `medium`, `hard`)
- `createdBy` (ObjectId, ref: users)
- `createdAt`, `updatedAt`

## Relationships
- A user can create many learning resources.
- A user can create many prompt challenges.
- `createdBy` is a foreign key reference from learning resources and challenges to users.
