# Social Network API

## Description
A robust API for a social network web application where users can share thoughts, react to friends' thoughts, and create a friend list. Built using Express.js for routing, MongoDB for the database, and Mongoose ODM.

## Features
- User and Thought management
- Friend list functionality
- Reaction system for thoughts
- Formatted timestamps
- Cascade delete of thoughts when user is deleted

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Make sure MongoDB is installed and running
4. Start the server:
```bash
npm start
```

## Usage
The API provides the following endpoints:

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- POST `/api/users` - Create new user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Friends
- POST `/api/users/:userId/friends/:friendId` - Add friend
- DELETE `/api/users/:userId/friends/:friendId` - Remove friend

### Thoughts
- GET `/api/thoughts` - Get all thoughts
- GET `/api/thoughts/:id` - Get thought by ID
- POST `/api/thoughts` - Create new thought
- PUT `/api/thoughts/:id` - Update thought
- DELETE `/api/thoughts/:id` - Delete thought

### Reactions
- POST `/api/thoughts/:thoughtId/reactions` - Add reaction
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove reaction

## Testing
Import the provided Insomnia collection for API testing.

## Walkthrough Video
[Link to Video Demonstration](https://drive.google.com/file/d/1VNyI7fumdOaYgRF91ddvDEMG6P-s06rD/view?usp=sharing)

## License
MIT License

## Questions
For any questions, please contact me:
- GitHub: [JaceG](https://github.com/JaceG)
- Email: jace.galloway@gmail.com
