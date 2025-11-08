# Secure RESTful API with Node.js, Express, and MongoDB

This project implements a secure set of RESTful APIs for user management and file uploads, fulfilling the requirements of Assignment 8. The backend is built using the **MERN stack components (Node.js, Express, MongoDB)** and focuses heavily on security, validation, and proper API design.

## 🚀 Features

The API implements the following core functionalities and security measures:

* **User CRUD Operations:** Endpoints for creating, retrieving, updating, and deleting user records.
* **Secure Password Storage:** All passwords are securely hashed using the **`bcrypt`** library before being stored in MongoDB.
* **Input Validation:** Comprehensive server-side validation using **`express-validator`** to enforce:
    * Strong password rules (min 8 chars, uppercase, lowercase, digit, special char).
    * Valid email and alphabet-only full names.
* **User Authentication:** A dedicated endpoint to authenticate users via email and password.
* **Secure File Uploads:** An endpoint to handle image uploads, utilizing **`multer`** for:
    * File type validation (only JPEG, PNG, GIF).
    * Uniqueness constraint (only one image per user).
    * Serving uploaded files statically.
* **Proper HTTP Status Codes:** All API responses return appropriate HTTP status codes (e.g., 201 for creation, 400 for validation errors, 404 for not found).

## 💻 Setup and Installation

### Prerequisites

* Node.js (v18+)
* MongoDB (local instance running on port 27017, or a cloud service like Atlas)

### Steps

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure MongoDB:**
    * Ensure your MongoDB connection string in `server.js` is correct. (e.g., `mongodb://localhost:27017/a8`)

3.  **Run the Server:**
    ```bash
    npm start 
    # Or for development with auto-restarts:
    npm run dev
    ```
    The server will run on `http://localhost:3000`.

## ⚙️ API Endpoints

All endpoints use `http://localhost:3000` as the base URL.

| Category | Method | Endpoint | Functionality | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| **User Management** | `POST` | `/user/create` | Creates a new user with strong password validation. | 201, 400 |
| **User Management** | `PUT` | `/user/edit` | Updates user details (Full Name, Password) based on email. | 200, 400, 404 |
| **User Management** | `DELETE` | `/user/delete` | Deletes a user based on email. | 200, 404 |
| **User Management** | `GET` | `/user/getAll` | Retrieves a list of all users, including hashed passwords. | 200 |
| **Authentication** | `POST` | `/user/authenticate` | Logs a user in and verifies credentials. | 200, 401, 404 |
| **File Upload** | `POST` | `/user/uploadImage` | Uploads a single image (JPEG, PNG, GIF) and saves the path. | 201, 400, 404 |

## ✅ Testing

Testing was performed using **Postman**. The complete Postman Collection file, including successful and validation failure scenarios for all endpoints, is included in the project root directory.


---