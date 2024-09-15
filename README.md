# To-Do List Application

This is a simple To-Do List API built with Node.js, Express.js, and MongoDB. It allows users to manage their tasks by providing features such as creating, updating, deleting, and retrieving tasks.

## Features
- Create a new task
- Get all tasks
- Update task status or details
- Delete a task
- Task validation, including due date and title uniqueness

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js
- MongoDB

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/todo-list-app.git
cd todo-list-app
```

### 2. Install Dependencies
Make sure to install all necessary dependencies using npm:
```bash
npm install
```

### 3. Set up Environment Variables
Create a ```.env``` file in the root directory and define your environment variables. Here's an example:
```bash
PORT=8000
MONGODB_URI=mongodb://localhost:27017/to-do-list
```

### 4. Start MongoDB Server
Ensure MongoDB is running locally. To start MongoDB, use:
```bash
mongod
```

### 5. Run the Application
Start the Node.js server using:
```bash
npm start
```
This will start the application on the port specified in the ```.env``` file (default is ```8000```).

### 6. Testing the API
You can now interact with the To-Do List API using a tool like Postman or curl.
- Create a Task (POST):  
  Endpoint: ```/api/v1/task/addTask```   
  Payload:
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "category": "Work",
    "dueDate": "2024-12-01"
  }
  ```

- Get All Tasks (GET):  
  Endpoint: ```/api/v1/task/getAllTasks```   

- Update Task Status (PUT):  
  Endpoint: ```/api/v1/task/updateTaskStatus/:id```   
  Payload:
  ```json
  {
    "status": "completed"
  }
  ```

- Update Task (PUT):  
  Endpoint: ```/api/v1/task/updateTask/:id```   
  Payload:
  ```json
  {
    "title": "New Task title",
    "description": "Updated Task description"
  }
  ```

- Delete a Task (DELETE):  
  Endpoint: ```/api/v1/task/deleteTask/:id```  

  
## Code Structure  
```bash
  /todo-list-app
  │
  ├── /db
  │   └── index.js         # MongoDB connection configuration
  ├── /models
  │   └── task.model.js    # Mongoose model schema for tasks
  ├── /routes
  │   └── task.routes.js   # Routes for task operations
  ├── /controllers
  │   └── task.controller.js  # Business logic for CRUD operations
  ├── /utils
  │   ├── apiError.js      # Custom error handling class
  │   ├── apiResponse.js   # Success response handler class
  │   └── asyncHandler.js  # Wrapper to handle async errors
  ├── .env                 # Environment variables (MONGODB_URI, PORT)
  ├── package.json         # Project dependencies and scripts
  └── server.js            # Main entry point for the application
```

### Key Components:
- ```server.js```: The entry point of the application where Express is initialized, middleware is configured, and routes are loaded. This file also establishes the MongoDB connection using the ```connectDB()``` function from ```db/index.js```.
- ```task.model.js```: Defines the structure of a task using Mongoose. Each task has a title, description, category, status, and due date, with validation logic to ensure that certain fields (like the due date being in the future) are correct.
- ```task.controller.js```: Contains the core logic for handling requests related to tasks, including creating, updating, fetching, and deleting tasks. We use ```asyncHandler``` to catch errors in asynchronous functions.
- ```apiError.js``` & ```apiResponse.js```: Custom utility classes to standardize API responses and error handling. This ensures consistency in how errors and success messages are returned to the client.
- ```asyncHandler.js```: A wrapper around async functions to streamline error handling in routes.

### Key Decisions:
1. MongoDB for Data Storage: Chose MongoDB for its schema flexibility, making it easier to manage tasks with varying levels of detail (optional descriptions, etc.). Mongoose is used for schema validation and interaction with the database.
2. Error Handling: Custom error handling with the ApiError class provides a standardized format for API errors, improving readability and debuggability for clients.
3. Task Validation: Added robust validation for tasks, including due date validation (must be in the future) and title uniqueness to prevent duplicate tasks with the same name.
4. Separation of Concerns: Kept the project structure modular with routes, controllers, models, and utilities separated for clarity, scalability, and maintainability.

