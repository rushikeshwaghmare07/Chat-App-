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

| Field      | Rules                     | Error Message                                   |
| ---------- | ------------------------- | ----------------------------------------------- |
| `fullName` | Minimum 2 characters long | "First name must be at least 2 characters long" |
| `email`    | Must be a valid email     | "Invalid email"                                 |
| `password` | Minimum 6 characters long | "Password must be at least 6 characters long"   |

---

### Example Response:

- **Success Response (201 Created) -**

```json
{
  "_id": "64c1234abcd567ef9012gh34",
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "profilePic": ""
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

## This API handles user registration and login in the application. It validates user input, checks for existing accounts, and securely manages user authentication.

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

| Field      | Rules                     | Error Message                                   |
| ---------- | ------------------------- | ----------------------------------------------- |
| `fullName` | Minimum 2 characters long | "First name must be at least 2 characters long" |
| `email`    | Must be a valid email     | "Invalid email"                                 |
| `password` | Minimum 6 characters long | "Password must be at least 6 characters long"   |

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

## **Logout User** -

### Overview

This API handles user logout in the application.

---

### Endpoints

- ### URL: `/api/auth/logout`
- ### Method: `POST`

---

### Example Response:

- **Success Response (200 OK) -**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Error Responses:

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

1. Clears the authentication cookie.

2. Returns a success response.

---

---

## **Update Profile** -

### Overview

This API allows users to update their profile picture by uploading a new image.

---

### Endpoints

- ### URL: `/api/auth/update-profile`
- ### Method: `PUT`
- ### Authentication: Requires a valid JWT token

---

### Request Body:

The request body should be in JSON format and include the following fields:

```json
{
  "profilePic": "base64_encoded_image_string_or_image_url"
}
```

---

### **Validation Rules**

| Field        | Rules                                              | Error Message              |
| ------------ | -------------------------------------------------- | -------------------------- |
| `profilePic` | Must be a valid image URL or base64-encoded string | "Profile pic is required." |

---

### Example Response:

- **Success Response (200 OK) -**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "updateUser": {
    "_id": "64c1234abcd567ef9012gh34",
    "fullName": "test_fullName",
    "email": "test@example.com",
    "profilePic": "https://cloudinary.com/image-url.jpg"
  }
}
```

### Error Responses:

- **Validation Error (400)**

```json
{
  "success": false,
  "message": "Profile pic is required."
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

- **Validation Errors:** Returns a `400` status if `profilePic` is missing.

- **Server Issues:** Returns a `500` status for unexpected errors.

---

### **Behavior**

1. Extracts the `userId` from the authenticated request.

2. Validates if `profilePic` is provided.

3. Uploads the profile picture to Cloudinary.

4. Updates the user record in the database.

5. Returns the updated user data.

---

---

## **Check Authentication API** -

### Overview

This API verifies if a user is authenticated by checking the provided JWT token.

---

### Endpoints

- ### URL: `/api/auth/check-auth`
- ### Method: `GET`
- ### Authentication: Requires a valid JWT token

---

### Example Response:

- **Success Response (200 OK) -**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "updateUser": {
    "_id": "64c1234abcd567ef9012gh34",
    "fullName": "test_fullName",
    "email": "test@example.com",
    "profilePic": "https://cloudinary.com/image-url.jpg"
  }
}
```

### Error Responses:

- **Validation Error (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- **Missing or Invalid Token:** Returns a 401 status if the user is not authenticated.

- **Server Issues:** Returns a 500 status for unexpected errors.

---

### **Behavior**

1. Extracts the `user` from the authenticated request.

2. Returns the user data if authentication is successful.

3. Handles errors appropriately and returns a relevant response.

---

---

# # Message API Documentation

---

## **Get Users for Sidebar API** -

### Overview

This API retrieves a list of users, excluding the currently logged-in user, for displaying in the sidebar.

---

### Endpoints

- ### URL: `/api/message/users`
- ### Method: `GET`
- ### Authentication: Requires a valid JWT token

---

### Example Response:

- **Success Response (200 OK) -**

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "filteredUsers": [
    {
      "_id": "64c1234abcd567ef9012gh34",
      "fullName": "Jane Doe",
      "email": "janedoe@example.com",
      "profilePic": "https://cloudinary.com/image-url.jpg"
    },
    {
      "_id": "64c5678abcd901ef3456ij78",
      "fullName": "Alice Smith",
      "email": "alicesmith@example.com",
      "profilePic": "https://cloudinary.com/image-url.jpg"
    }
  ]
}
```

### Error Responses:

- **Validation Error (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- **Authentication Failure:** Returns a 401 status if the user is not authenticated.

- **Server Issues:** Returns a 500 status for unexpected errors.

---

### **Behavior**

1. Extracts the logged-in `user's ID` from the request.

2. Fetches all users except the logged-in user from the database.

3. Returns the list of users excluding sensitive data like passwords.

---

---

## **Get Messages API** -

### Overview

This API retrieves messages exchanged between the authenticated user and another specified user.

---

### Endpoints

- ### URL: `/api/message/:id`
- ### Method: `GET`
- ### Authentication: Requires a valid JWT token

---

### **Path Parameters**

| Parameter | Type   | Description                     |
| --------- | ------ | ------------------------------- |
| `id`      | String | The ID of the user to chat with |

---

### Example Response:

- **Success Response (200 OK) -**

```json
{
  "success": true,
  "message": "Messages fetched successfully",
  "messages": [
    {
      "_id": "64c987abcd567ef9012klm34",
      "senderId": "64c1234abcd567ef9012gh34",
      "receiverId": "64c5678abcd901ef3456ij78",
      "content": "Hello! How are you?",
      "timestamp": "2025-03-06T12:00:00Z"
    },
    {
      "_id": "64c654abcd567ef9012xyz78",
      "senderId": "64c5678abcd901ef3456ij78",
      "receiverId": "64c1234abcd567ef9012gh34",
      "content": "I'm good! How about you?",
      "timestamp": "2025-03-06T12:05:00Z"
    }
  ]
}
```

### Error Responses:

- **Validation Error (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- **Authentication Failure:** Returns a `401` status if the user is not authenticated.

- **Server Issues:** Returns a `500` status for unexpected errors.

---

### **Behavior**

1. Extracts the logged-in user's ID from the request.

2. Retrieves all messages between the authenticated user and the specified user.

3. Returns the list of messages in chronological order.

---

---

## **Send Message API** -

### Overview

This API allows an authenticated user to send a message, optionally including an image, to another user.

---

### Endpoints

- ### URL: `/api/message/send/:id`
- ### Method: `POST`
- ### Authentication: Requires a valid JWT token

---

### **Path Parameters**

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `id`      | String | The ID of the user receiving the message |

---

### Request Body-

```json
{
  "message": "Hello, how are you?",
  "image": "string (optional)"
}
```

---

### Example Response:

- **Success Response (201 Created) -**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "newMessage": {
    "_id": "64c987abcd567ef9012klm34",
    "senderId": "64c1234abcd567ef9012gh34",
    "receiverId": "64c5678abcd901ef3456ij78",
    "message": "Hello, how are you?",
    "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    "timestamp": "2025-03-06T12:00:00Z"
  }
}
```

### Error Responses:

- **Validation Error (401)**

```json
{
  "success": false,
  "message": "Unauthorized access"
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

- **Authentication Failure:** Returns a `401` status if the user is not authenticated.

- **Server Issues:** Returns a `500` status for unexpected errors.

---

### **Behavior**

1. Extracts the logged-in user's ID from the request.

2. Extracts the message content and optional image.

3. If an image is provided, it is uploaded to Cloudinary.

4. Saves the message in the database with sender and receiver details.

5. Returns the newly created message.

---
