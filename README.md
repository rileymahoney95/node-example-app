# Node.js Express TypeScript API

A modern, production-ready API boilerplate featuring TypeScript, Express, and comprehensive tooling for building scalable web services. This project implements a robust architecture with built-in support for PostgreSQL/DynamoDB, OpenAPI documentation, and enterprise-grade security features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Development](#development)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This API boilerplate provides a solid foundation for building enterprise-grade web applications with:

### Core Technologies

- **TypeScript** - For type safety and enhanced developer experience
- **Express.js** - Fast, unopinionated web framework
- **TypeORM** - ORM for PostgreSQL with strong TypeScript integration
- **DynamoDB** - Alternative NoSQL database support
- **Zod** - Runtime type validation and API schema generation
- **OpenAPI/Swagger** - Automated API documentation
- **Winston** - Structured logging

### Why These Technologies?

- **TypeScript**: Catches errors early, improves maintainability, and provides better IDE support
- **Express**: Mature ecosystem, flexible middleware system, and excellent performance
- **Zod**: Type-safe schema validation that integrates perfectly with TypeScript
- **TypeORM/DynamoDB**: Flexible database options for both SQL and NoSQL needs

## Features

### Core Functionality

- 🔐 **Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- 🛡️ **Security**

  - Helmet.js for HTTP headers
  - CORS configuration
  - Request validation
  - Rate limiting support

- 📝 **API Documentation**

  - Auto-generated OpenAPI/Swagger docs
  - Interactive API testing interface
  - Type-safe schema generation

- 🔄 **Error Handling**
  - Global error handling middleware
  - Custom error classes
  - Validation error handling
  - Async error catching

### API Features

- 👥 **User Management**

  - User registration and authentication
  - Profile management
  - Role-based permissions

- 🛍️ **Product Management**

  - CRUD operations
  - Validation rules
  - Admin-only access controls

- 📊 **Database Integration**
  - TypeORM for PostgreSQL
  - Repository pattern
  - Migration support
  - DynamoDB integration

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- AWS Account (for DynamoDB features)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:

```bash
cp .env.example .env
```

4. Configure your `.env` file:

```env
# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=your-database

# AWS (Optional - for DynamoDB)
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Logging
LOG_LEVEL=info
```

## Project Structure

```
src/
├── config/         # Configuration files
│   ├── db/        # Database configurations
│   └── aws/       # AWS configurations
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
│   ├── auth.ts    # Authentication middleware
│   ├── error.ts   # Error handling middleware
│   └── validate.ts # Request validation
├── models/        # Database models
├── routes/        # Route definitions
├── services/      # Business logic
├── utils/         # Utility functions
├── openapi/       # API documentation
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

### Directory Purposes

- **config/**: Application configuration including database and AWS settings
- **controllers/**: HTTP request handlers implementing the API endpoints
- **middleware/**: Express middleware for authentication, validation, etc.
- **models/**: Database models and schemas
- **routes/**: API route definitions and endpoint grouping
- **services/**: Business logic and data access layer
- **utils/**: Shared utilities and helper functions
- **openapi/**: API documentation and Swagger configuration

## Configuration

### Environment Variables

- **Server**:

  - `PORT`: Port for the API server
  - `NODE_ENV`: Environment (development, production, etc.)

- **JWT**:

  - `JWT_SECRET`: Secret key for JWT token generation

- **PostgreSQL**:

  - `POSTGRES_HOST`: Hostname of the PostgreSQL server
  - `POSTGRES_PORT`: Port for the PostgreSQL connection
  - `POSTGRES_USER`: Username for the PostgreSQL connection
  - `POSTGRES_PASSWORD`: Password for the PostgreSQL connection
  - `POSTGRES_DB`: Database name for the PostgreSQL connection

- **AWS**:

  - `AWS_REGION`: AWS region for DynamoDB
  - `AWS_ACCESS_KEY_ID`: AWS access key ID for DynamoDB
  - `AWS_SECRET_ACCESS_KEY`: AWS secret access key for DynamoDB

- **Logging**:
  - `LOG_LEVEL`: Level of logging (info, warn, error, etc.)

## Usage

### Running the API

```bash
npm start
```

### API Documentation

- **Swagger UI**: Accessible at `/api-docs`
- **OpenAPI Specification**: Available in JSON format at `/openapi.json`

## Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run integration-test
```

## Deployment

### Docker

```bash
docker build -t your-api .
docker run -p 3000:3000 your-api
```

## Contributing

### Code Contributions

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit and push
5. Create a pull request

### Issue Reporting

If you find a bug or want to request a feature, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or support, please contact the project maintainers:

- [Your Name](mailto:your-email@example.com)
- [GitHub Repository](https://github.com/yourusername/your-repo-name)

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for hot reloading.

### Building for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` directory.

### Available Scripts

- `npm start` - Run the production server
- `npm run dev` - Run the development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user
- `GET /api/users/profile` - Get user profile (protected)

### Product Routes

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Database

### PostgreSQL Setup

1. Create database:

```sql
CREATE DATABASE your_database_name;
```

2. Run migrations:

```bash
npm run typeorm migration:run
```

### TypeORM Commands

- Generate migration:

```bash
npm run typeorm migration:generate -- -n MigrationName
```

- Create new migration:

```bash
npm run typeorm migration:create -- -n MigrationName
```

## Security Best Practices

- Use environment variables for sensitive data
- Enable CORS with appropriate origins
- Set secure HTTP headers with Helmet
- Implement rate limiting for public endpoints
- Use parameter validation for all inputs
- Implement proper error handling
- Log securely, avoid sensitive data

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check PostgreSQL service is running
   - Verify database credentials
   - Ensure database exists

2. **JWT Authentication Failed**

   - Check JWT_SECRET in environment variables
   - Verify token expiration
   - Check token format in request

3. **TypeORM Sync Issues**
   - Run `npm run typeorm schema:sync`
   - Check entity definitions
   - Verify database connection
