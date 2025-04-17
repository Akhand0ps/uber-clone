# Users API Endpoints

## /users/register Endpoint

### Description
The `/users/register` endpoint allows for user registration. It validates required fields, hashes the provided password, creates a new user, and generates an authentication token.

### HTTP Method
POST

### Request Format
Content-Type: application/json

#### Required Data
- **email**: Valid email address
- **fullname**: An object containing:
  - **firstname**: String (minimum 3 characters)
  - **lastname**: String (optional, minimum 3 characters if provided)
- **password**: String (minimum 6 characters)

##### Example Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePass123"
}
```

### Status Codes
- **201 Created:** User successfully registered. Returns a JSON object with a JWT token and user details.
- **400 Bad Request:** Validation errors. Returns an array of error messages indicating invalid or missing fields.

##### Example Response (201 Created)
```json
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
```

---

## /users/login Endpoint

### Description
The `/users/login` endpoint allows a registered user to log in. It validates the input, checks the provided credentials against the stored data, and returns an authentication token on success.

### HTTP Method
POST

### Request Format
Content-Type: application/json

#### Required Data
- **email**: Valid email address
- **password**: String (minimum 6 characters)

##### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "securePass123"
}
```

### Status Codes
- **200 OK:** Login successful. Returns a JSON object with a JWT token and user details.
- **400 Bad Request:** Validation errors. Returns an array of error messages indicating invalid or missing fields.
- **401 Unauthorized:** Login failed. Returned when the email does not exist or the password is incorrect.

##### Example Response (200 OK)
```json
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
```

---

## /users/profile Endpoint

### Description
The `/users/profile` endpoint retrieves the authenticated user’s profile information. A valid JWT token must be provided either via a cookie or the Authorization header.

### HTTP Method
GET

### Authentication
Required. The request must pass through the authentication middleware.

### Status Codes
- **200 OK:** Returns the authenticated user's profile details.
- **401 Unauthorized:** Returned if the JWT token is missing or invalid.

##### Example Response (200 OK)
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

---

## /users/logout Endpoint

### Description
The `/users/logout` endpoint logs the user out by clearing the token cookie and blacklisting the token to prevent further use.

### HTTP Method
GET

### Authentication
Required. The request must include a valid JWT token sent via cookie or the Authorization header.

### Status Codes
- **200 OK:** Logout successful. Returns a confirmation message.
- **401 Unauthorized:** Returned if the token is missing or invalid.

##### Example Response (200 OK)
```json
{
  "message": "Logout successful"
}
```

---

# Captain API Endpoints

## /captains/register Endpoint

### Description
The `/captains/register` endpoint allows for captain registration with vehicle information. It validates required fields and creates a new captain account.

### HTTP Method
POST

### Request Format
Content-Type: application/json

#### Required Data
- **email**: Valid email address
- **fullname**: An object containing:
  - **firstname**: String (minimum 3 characters)
  - **lastname**: String (optional)
- **password**: String (minimum 6 characters)
- **vehicle**: An object containing:
  - **color**: String (minimum 3 characters)
  - **plate**: String (minimum 3 characters)
  - **capacity**: Integer (minimum 1)
  - **vehicleType**: String (must be one of: 'car', 'motorcycle', 'auto')

##### Example Request Body
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Smith"
  },
  "password": "securePass123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Status Codes
- **201 Created:** Captain successfully registered
- **400 Bad Request:** Validation errors. Returns an array of error messages for:
  - Invalid email format
  - First name less than 3 characters
  - Password less than 6 characters
  - Vehicle color less than 3 characters
  - Vehicle plate less than 3 characters
  - Capacity less than 1
  - Invalid vehicle type

##### Example Response (201 Created)
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## /captains/login Endpoint

### Description
The `/captains/login` endpoint authenticates captains and provides them with a JWT token for subsequent requests.

### HTTP Method
POST

### Request Format
Content-Type: application/json

#### Required Data
- **email**: Valid email address
- **password**: String (minimum 6 characters)

##### Example Request Body
```json
{
  "email": "captain@example.com",
  "password": "securePass123"
}
```

### Status Codes
- **200 OK:** Login successful
- **400 Bad Request:** Validation errors
- **401 Unauthorized:** Invalid credentials

##### Example Response (200 OK)
```json
{
  "token": "generated_jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## /captains/profile Endpoint

### Description
The `/captains/profile` endpoint retrieves the authenticated captain's profile information including vehicle details.

### HTTP Method
GET

### Authentication
Required. Must include valid JWT token in cookie or Authorization header.

### Status Codes
- **200 OK:** Returns captain's profile
- **401 Unauthorized:** Invalid or missing token

##### Example Response (200 OK)
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## /captains/logout Endpoint

### Description
The `/captains/logout` endpoint invalidates the captain's JWT token and clears the authentication cookie.

### HTTP Method
GET

### Authentication
Required. Must include valid JWT token in cookie or Authorization header.

### Status Codes
- **200 OK:** Logout successful
- **401 Unauthorized:** Invalid or missing token

##### Example Response (200 OK)
```json
{
  "message": "Logout successful"
}
```