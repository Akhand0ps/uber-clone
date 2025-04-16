# /users/register Endpoint

## Description
The `/users/register` endpoint allows for user registration. It validates required fields, hashes the provided password, creates a new user, and generates an authentication token.

## HTTP Method
POST

## Request Format
Content-Type: application/json

### Required Data
- email: Valid email address
- fullname: An object containing:
  - firstname: String (minimum 3 characters)
  - lastname: String (optional, minimum 3 characters if provided)
- password: String (minimum 6 characters)

#### Example Request Body
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePass123"
}

## Status Codes
- **201 Created:** User successfully registered. Returns a JSON object with a JWT token and user details.
- **400 Bad Request:** Validation errors. Returns an array of error messages indicating invalid or missing fields.

## Example Response (201 Created)
{
  "token": "generated_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}