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

```bash
git clone https://github.com/pavan-kalyan0412/Voting-App.git
cd voting-system
