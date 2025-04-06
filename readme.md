# Twitter Server Backend

This project serves as the backend for the Twitter application. It provides APIs for user management, tweet management, and other functionalities required for the application. Below is a detailed description of all the APIs and their functionalities.

---

## Table of Contents
1. [User Management APIs](#user-management-apis)
2. [Tweet Management APIs](#tweet-management-apis)
3. [Authentication APIs](#authentication-apis)
4. [Other APIs](#other-apis)
5. [Setup Instructions](#setup-instructions)

---

## User Management APIs

### 1. Create User
- **Endpoint**: `POST /api/users`
- **Description**: Creates a new user.
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "username": "string",
        "email": "string"
    }
    ```

### 2. Get User Details
- **Endpoint**: `GET /api/users/:id`
- **Description**: Fetches details of a specific user by ID.
- **Response**:
    ```json
    {
        "id": "string",
        "username": "string",
        "email": "string",
        "createdAt": "timestamp"
    }
    ```

### 3. Update User
- **Endpoint**: `PUT /api/users/:id`
- **Description**: Updates user details.
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "username": "string",
        "email": "string"
    }
    ```

---

## Tweet Management APIs

### 1. Create Tweet
- **Endpoint**: `POST /api/tweets`
- **Description**: Creates a new tweet.
- **Request Body**:
    ```json
    {
        "content": "string",
        "userId": "string"
    }
    ```
- **Response**:
    ```json
    {
        "id": "string",
        "content": "string",
        "userId": "string",
        "createdAt": "timestamp"
    }
    ```

### 2. Get All Tweets
- **Endpoint**: `GET /api/tweets`
- **Description**: Fetches all tweets.
- **Response**:
    ```json
    [
        {
            "id": "string",
            "content": "string",
            "userId": "string",
            "createdAt": "timestamp"
        }
    ]
    ```

### 3. Delete Tweet
- **Endpoint**: `DELETE /api/tweets/:id`
- **Description**: Deletes a specific tweet by ID.
- **Response**:
    ```json
    {
        "message": "Tweet deleted successfully"
    }
    ```

---

## Authentication APIs

### 1. Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates a user and provides a token.
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response**:
    ```json
    {
        "token": "string"
    }
    ```

### 2. Logout
- **Endpoint**: `POST /api/auth/logout`
- **Description**: Logs out the user.
- **Response**:
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

---

## Other APIs

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Checks if the server is running.
- **Response**:
    ```json
    {
        "status": "OK"
    }
    ```

---

## Setup Instructions

1. Clone the repository:
     ```bash
     git clone https://github.com/your-repo/twitter-server.git
     ```
2. Navigate to the project directory:
     ```bash
     cd twitter-server
     ```
3. Install dependencies:
     ```bash
     npm install
     ```
4. Set up environment variables in a `.env` file:
     ```
     PORT=3000
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```
5. Start the server:
     ```bash
     npm start
     ```

---

## Notes for Frontend Developers
- Ensure to include the `Authorization` header with the token for protected routes.
- Use the provided endpoints to interact with the backend services.

## Additional Notes

### Database Setup
- You can use **Supabase** as a managed PostgreSQL database solution. It provides an easy-to-use interface and built-in authentication features.
- Alternatively, you can set up your own PostgreSQL database on a cloud provider or on-premises.

### Deployment to AWS

#### Using EC2, Load Balancer, and Target Group
1. **Launch an EC2 Instance**:
    - Create an EC2 instance with the desired operating system (e.g., Amazon Linux 2 or Ubuntu).
    - Install Node.js and other dependencies required for the application.

2. **Set Up a Load Balancer**:
    - Create an Application Load Balancer (ALB) in the AWS Management Console.
    - Configure the ALB to forward traffic to a Target Group.

3. **Configure Target Group**:
    - Add your EC2 instance to the Target Group.
    - Ensure the health check path is set to `/api/health` to monitor the application's status.

4. **Update Security Groups**:
    - Allow inbound traffic on port 80 (HTTP) or 443 (HTTPS) for the Load Balancer.
    - Restrict access to the EC2 instance to only allow traffic from the Load Balancer.

#### Securing with CloudFront
1. **Set Up CloudFront**:
    - Create a CloudFront distribution and configure it to forward requests to the Load Balancer.
    - Enable HTTPS for secure communication.

2. **Restrict Direct Access**:
    - Use AWS WAF (Web Application Firewall) to block direct access to the Load Balancer.
    - Allow traffic only from CloudFront.

3. **Enable SSL/TLS**:
    - Use an AWS Certificate Manager (ACM) certificate to enable HTTPS for your CloudFront distribution.

4. **Caching and Performance**:
    - Configure caching rules in CloudFront to improve performance and reduce load on the backend.

### Final Steps
- Test the deployment by accessing the CloudFront URL.
- Monitor the application using AWS CloudWatch for logs and metrics.

--- 

These steps will help you set up a robust and secure deployment for your application on AWS.