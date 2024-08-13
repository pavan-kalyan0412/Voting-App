# Voting System Application

This is a Node.js-based voting system application that allows users to register, login, and vote for candidates. It also includes admin functionalities such as adding, updating, and deleting candidates.

## Features

- User registration with Aadhar Card Number validation.
- User authentication and authorization using JWT (JSON Web Tokens).
- Admin functionality to manage candidates (add, update, delete).
- Voting functionality with validation to ensure users can only vote once.
- Viewing the list of all candidates, sorted by vote count, with information on who voted.
- Protected routes that only authenticated users can access.
- Ability to change passwords after logging in.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing
- dotenv for environment variables

## Prerequisites

- Node.js installed on your machine
- MongoDB running locally or an accessible MongoDB Atlas instance
- Git installed on your machine

## Getting Started

### 1. Clone the Repository

  1. git clone https://github.com/pavan-kalyan0412/Voting-App.git

  2. cd voting-system

### Install Dependencies
   1. npm install

### Setup Environment Variables
   1. PORT=3000
   2. JWT_SECRET=your_secret_key
   3. MONGO_URI=mongodb://localhost:27017/voting-system

 ### Note: Replace your_secret_key with a secret key of your choice, and ensure your MongoDB instance is running.

 ### Start the Application
    1. npm start


### API Endpoints
>> User Routes

    POST /user/signup: Register a new user.
    POST /user/login: Login a user and receive a JWT.
    GET /user/profile: Access a protected route to view the profile (requires JWT).
    POST /user/change-password: Change the user password.

>> Candidate Routes

    POST /add-candidate: Add a new candidate (Admin only).
    PUT /update-candidate/:id: Update an existing candidate (Admin only).
    DELETE /delete-candidate/:id: Delete a candidate (Admin only).
    POST /vote/:candidateId: Vote for a candidate.
    GET /candidates: Get all candidates sorted by vote count.
    GET /candidates-list: Get a list of all candidates with only name and party fields.

>> Testing the Application

You can use tools like Postman to test the API endpoints.
1. User Signup

    Method: POST
    URL: http://localhost:3000/user/signup
    Body (JSON):

  >>>>
    {
      "name": "John Doe",
      "AadharCardNumber": "123456789012",
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "User" // or "Admin"
    }

2. User Login

    Method: POST
    URL: http://localhost:3000/user/login
    Body (JSON):

  >>> 
    {
      "AadharCardNumber": "123456789012",
      "password": "password123"
    }

3. Add a Candidate (Admin Only)

    Method: POST
    URL: http://localhost:3000/add-candidate
    Header:
        Authorization: Bearer <JWT_TOKEN>
    Body (JSON):

    >>>
    {
      "name": "Jane Smith",
      "party": "Example Party",
      "age": 45
    }

4. Vote for a Candidate

    Method: POST
    URL: http://localhost:3000/vote/<candidateId>
    Header:
        Authorization: Bearer <JWT_TOKEN>

5. Get All Candidates

    Method: GET
    URL: http://localhost:3000/candidates

### Contribution

Feel free to fork this project and submit pull requests. Contributions are welcome!