# Express.js Skeleton Project

This repository serves as a basic template for building Express.js applications. It includes essential features such as basic CRUD operations, authentication, and file uploads. The project can be cloned and used as a starting point for any Express.js application.

## Features
- Basic CRUD functionality (Create, Read, Update, Delete)
- User authentication (JWT-based or session-based)
- File upload functionality
- Well-structured project layout for scalability

## Technologies Used
- **Node.js**: Runtime environment for executing JavaScript.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB / PostgreSQL / MySQL**: Example database integration (choose one and configure as needed).
- **Multer**: Middleware for handling file uploads.
- **JWT / Passport.js**: For handling authentication (configurable to your needs).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/putridamayanti/express-skeleton.git
    cd express-skeleton
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following variables:

    ```bash
    PORT=5000
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    ```

4. Run database migrations (if applicable):

    ```bash
    # Example for Sequelize
    npx sequelize-cli db:migrate
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

   The app will be running at `http://localhost:5000`.

## Usage

1. **CRUD Operations**:
    - You can create, read, update, and delete resources via the API endpoints.

2. **Authentication**:
    - Use `/auth/register` and `/auth/login` for user registration and login. The authentication system supports JWT by default.

3. **File Upload**:
    - To upload files, use the `/upload` endpoint with a POST request. The uploaded files are stored in the `uploads` folder.

## Folder Structure

```bash
.
├── config/         # Configuration files (e.g., database, auth)
├── controllers/    # Route logic and controller functions
├── middleware/     # Middleware (auth, error handling, etc.)
├── models/         # Database models
├── routes/         # Route definitions
├── uploads/        # Folder for storing uploaded files
├── .env            # Environment variables (not included in repo)
└── index.js          # Main application file
