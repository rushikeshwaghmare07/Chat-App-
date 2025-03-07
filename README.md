# Backend API Documentation

## **Register User** -

### Overview

This API handles user registration in the application. It validates user input, checks for existing accounts, and securely stores user credentials.

---

### Endpoints

- ### URL: `/api/auth/signup`
- ### Method: `POST`

---

### Request Body:

The request body should be in JSON format and include the following fields:

```json
{
  "fullName": "test_fullName",
  "email": "test@test.com",
  "password": "securepassword"
}
```
---

### **Validation Rules**

| Field                | Rules                     | Error Message                                   |
| -------------------- | ------------------------- | ----------------------------------------------- |
| `fullName` | Minimum 2 characters long | "First name must be at least 2 characters long" |
| `email`              | Must be a valid email     | "Invalid email"                                 |
| `password`           | Minimum 6 characters long | "Password must be at least 6 characters long"   |

---

### Example Response:

- **Success Response (201 Created) -**

```json
{
  "_id": "64c1234abcd567ef9012gh34",
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "profilePic": "",
}
```

### Error Responses:

- **Validation Error (400)**

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Full name must be at least 2 characters long"
}
```

- **User Already Exists (400)**

```json
{
  "success": false,
  "message": "User already exists"
}
```

- **Invalid User Data (400)**

```json
{
  "success": false,
  "message": "Invalid user data"
}
```

- **Internal Server Error (500)**

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error message here"
}
```

### **Error Handling**

- **Validation Errors:** A `400` status with a descriptive error message.

- **User Already Exists:** Returns a `400` status if the email is already registered.

- **Invalid Data:** Returns a `400` status if user data is incorrect or incomplete.

- **Server Issues:** Returns a `500` status for unexpected errors.

---

### **Behavior**

1. Validates the incoming request using `ZOD`.

2. Checks if the email is already registered.

3. Hashes the password using bcrypt.

4. Creates a new user and saves it in the database.

5. Generates a JWT token for authentication.

6. Returns the user data (excluding the password) and the JWT token.

---


## **Login User** -

### Overview

This API handles user registration and login in the application. It validates user input, checks for existing accounts, and securely manages user authentication.
---

### Endpoints

- ### URL: `/api/auth/signin`
- ### Method: `POST`

---

### Request Body:

The request body should be in JSON format and include the following fields:

```json
{
  "email": "test@test.com",
  "password": "securepassword"
}
```
---

### **Validation Rules**

| Field                | Rules                     | Error Message                                   |
| -------------------- | ------------------------- | ----------------------------------------------- |
| `fullName` | Minimum 2 characters long | "First name must be at least 2 characters long" |
| `email`              | Must be a valid email     | "Invalid email"                                 |
| `password`           | Minimum 6 characters long | "Password must be at least 6 characters long"   |

---

### Example Response:

- **Success Response (201 Created) -**

```json
{
  "_id": "64c1234abcd567ef9012gh34",
  "fullName": "test_fullName",
  "email": "test@test.com",
  "profilePic": "",
  "token": "jwt_token_here"
}
```

### Error Responses:

- **Validation Error (400)**

```json
{
  "success": false,
  "message": "Validation error",
  "error": "Full name must be at least 2 characters long"
}
```

- **User Already Exists (400)**

```json
{
  "success": false,
  "message": "All fields are required."
}
```

- **Invalid User Data (401)**

```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

- **Internal Server Error (500)**

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error message here"
}
```

### **Error Handling**

- **Validation Errors:** A `400` status with a descriptive error message.

- **User Already Exists:** Returns a `400` status if the email is already registered.

- **Invalid Data:** Returns a `400` status if user data is incorrect or incomplete.

- **Server Issues:** Returns a `500` status for unexpected errors.

---

### **Behavior**

1. Checks if all fields are provided.

2. Verifies user existence in the database.

3. Compares the password using `bcrypt`.

4. Generates a JWT token for authentication.

5. Returns the user data (excluding the password) and the JWT token.

---
