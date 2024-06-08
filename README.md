
# CGWallet

CGWallet is a basic implementation of a digital wallet system similar to PayTM. This project includes both backend and frontend functionalities, allowing users to sign up, sign in, view their account balance, and transfer money to other users.

## Features

- User Authentication (Sign up, Sign in)
- Account Balance Inquiry
- Money Transfer between Users

## Technology Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT)
- Frontend: React, Vite, Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ozearkhan/cgwallet.git
   cd cgwallet/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string and JWT secret
   ```env
   JWT_SECRET=your_jwt_secret_key
   DB_KEY=mongodb+srv://admin:password@cluster0.mongodb.net/paytm_basic
   ```

4. Start the backend server
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the frontend server
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:3000` for the backend and `http://localhost:5173` for the frontend.
2. Sign up for a new account or sign in if you already have one.
3. Use the dashboard to check your balance and transfer money to other users.

## Folder Structure

```
cgwallet
├── backend
│   ├── config.js
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── routes
│       ├── account.js
│       ├── index.js
│       ├── middleware.js
│       └── user.js
└── frontend
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── src
    │   ├── App.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages
    │       ├── Dashboard.jsx
    │       ├── SendMoney.jsx
    │       ├── Signin.jsx
    │       └── Signup.jsx
    └── tailwind.config.js
```

## Contributing

Feel free to contribute to this project by submitting a pull request or opening an issue.

## License

This project is licensed under the MIT License.


### Internal Working

#### Backend

1. **Configuration**
   - **config.js**: Stores sensitive information like the JWT secret and MongoDB connection string.

2. **Database**
   - **db.js**: Connects to MongoDB and defines the schema for `User` and `Account`.

3. **Server Setup**
   - **index.js**: Sets up the Express server with middleware (CORS, body-parser) and routes.

4. **Routes**
   - **routes/index.js**: Main router file.
   - **routes/account.js**: Handles account-related routes for balance inquiry and money transfer.
   - **routes/user.js**: Manages user authentication routes (signup, signin).

5. **Authentication**
   - **middleware.js**: Contains middleware functions for protecting routes with JWT authentication.

#### Frontend

1. **React and Vite Setup**
   - **App.jsx**: Configures routing for different pages using React Router.
   - **main.jsx**: Entry point for the React application.

2. **Pages**
   - **Dashboard.jsx**: Displays user dashboard with balance and user list.
   - **LandingPage.jsx**: Home page displaying account overview, actions, and user list.
   - **SendMoney.jsx**: Page for transferring money between accounts.
   - **Signin.jsx**: Sign-in page for user authentication.
   - **Signup.jsx**: Sign-up page for user registration.

3. **Components**
   - Various components like Appbar, Balance, Users, Button, InputBox, etc., are used across different pages for UI consistency.


