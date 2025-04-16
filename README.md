# Node.js Express TypeScript API

A modern, production-ready API boilerplate featuring TypeScript, Express, and comprehensive tooling for building scalable web services. This project implements a robust architecture with built-in support for PostgreSQL/DynamoDB, OpenAPI documentation, and enterprise-grade security features.

## Table of Contents

- [Architecture and Tech Stack](#architecture-and-tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
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

## Architecture and Tech Stack

### 🧱 Code Structure

This project follows a **Layered Architecture** pattern (also known as "Service-oriented MVC"). Each layer has a clear responsibility, making the codebase easier to maintain, test, and scale.

#### Models (Entities)

- Represent the core **domain data structures**
- Define **relationships** (e.g., `OneToMany`, `ManyToOne`)
- Track **external IDs** for integration with third-party systems
- Specify **indexes** for performance optimization
- No business logic should exist here — just structure

#### Repositories

- One repository per entity (e.g., `UserRepository`)
- Contain **pure database operations** (CRUD, queries)
- No business logic — just data access
- Extend TypeORM's base repository or custom base class
- Support utilities like **pagination** and filtering

#### Services

- Encapsulate **business logic** and domain rules
- Call multiple repositories and/or external APIs
- Should be **stateless** and testable
- Avoid circular dependencies between services
- Most **flexible layer** in terms of structure and conventions

#### Schemas

- Define **input/output types** for your API
- Provide **runtime validation** (e.g., with `zod`, `class-validator`)
- Used in both **controllers** and **services**
- Can generate **OpenAPI/Swagger** documentation automatically

#### Controllers

- Act as **route handlers**
- Responsible for **request/response orchestration**
- Delegate logic to the appropriate service
- Handle status codes, error formatting, and output serialization
- Avoid placing any business logic here

#### Routes

- Define **API endpoints** (e.g., `/users`, `/auth/login`)
- Apply **route-specific middleware** (e.g., auth, logging)
- Pass requests to the appropriate **controller**

---

#### Abstraction Philosophy

When designing entities and services, think through a few **real-world use cases** to validate your design. Good abstractions:

- Support future changes with minimal rework
- Encourage **separation of concerns**
- Surface boundaries between internal logic and third-party systems

---

### Core Technologies

- **TypeScript** - For type safety and enhanced developer experience
- **Express.js** - Fast, unopinionated web framework
- **TypeORM** - ORM for PostgreSQL with strong TypeScript integration
- **DynamoDB** - Alternative NoSQL database support
- **Zod** - Runtime type validation and API schema generation
- **OpenAPI/Swagger** - Automated API documentation
- **Winston** - Structured logging

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL
- AWS Account

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
