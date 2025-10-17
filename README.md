#  Conexa Test API

A RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL**, providing user authentication and movie management features.  
This project was created as part of the **Conexa technical challenge**.

---

##  Tech Stack

- **NestJS** – Node.js framework for scalable server-side applications  
- **TypeORM** – ORM for database management  
- **PostgreSQL** – Relational database  
- **JWT** – Authentication and authorization  
- **Docker Compose** – Local development environment setup

---

##  Setup & Installation

### Prerequisites

Make sure you have the following installed:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Running the project locally

Build and start all services:

```bash
docker compose up --build
```
This will start:
```bash
API → http://localhost:3000
PostgreSQL → running on port 5432
```
To stop and remove containers:

```bash
docker compose down -v
```
### Environment Variables

Default environment variables are already defined in docker-compose.yml:
```bash
JWT_SECRET: test
NODE_ENV: DEV
POSTGRES_USER: user
POSTGRES_PASSWORD: admin
POSTGRES_DATABASE: local
POSTGRES_HOST: db
POSTGRES_PORT: 5432
RUN_MIGRATIONS: true
```
You can customize these values if needed.

### Project Structure
```bash
src/
 ├── modules/
 │   ├── auth/            # auth module
 │   ├── users/           # User registration and authentication
 │   └── movies/          # Movies CRUD operations
 ├── common/
 │   └── decorators/      # custom decorators
 │   └── filters/         # Filters
 │   └── guards/          # Auth and roles guards
 ├── config/              # Database, JWT and swagger  configuration
 │── database/            # Seeder for default roles
 └── utils/               # shared utils for all proyect
```
## API Documentation
```bash
http://localhost:3000/api/v1/docs#/
```
For a full interactive version of the API docs, visit:
- [Api Documentation](https://app.theneo.io/c57a68a3-a4b2-43bc-a23e-7b8315f3d085/conexatestnest)

