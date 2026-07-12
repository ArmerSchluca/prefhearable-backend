# Prefhearable (Server)

This repository contains the backend of the Prefhearable project.

For a detailed project description and the corresponding Flutter client, see the
[Prefhearable Frontend](https://github.com/ArmerSchluca/prefhearable-frontend).

## Tech Stack & Architecture

- **Backend Framework:** Node.js with Express.js
- **Database:** MariaDB
- **API Style:** REST API

## Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed and an instance of [MariaDB](https://mariadb.org/) running.

For development, the following `docker-compose.yml` was used to provision the MariaDB database and phpMyAdmin:
```yaml
services:
  mariadb:
    image: mariadb:latest
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: prefhearable
      MYSQL_USER: root
      MYSQL_PASSWORD: root
    ports:
      - "3306:3306"
    volumes:
      - ./data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: unless-stopped
    environment:
      PMA_HOST: mariadb
      PMA_USER: root
      PMA_PASSWORD: root
    ports:
      - "8080:80"
    depends_on:
      - mariadb
```

### Installation & Run

1. Create directory if not already done:

```bash
mkdir Prefhearable
cd Prefhearable
```

2. Clone repository:

```bash
git clone https://github.com/ArmerSchluca/prefhearable-backend.git
```

3. Setup project and dependencies:

```bash
cd backend
npm install
```

4. Create a new .env file on root level of the project and fill in the variables with proper values of your database instance:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=username
DB_PASSWORD=changeme123
DATABASE=prefhearable
```

5. Initialize the database:

Execute the SQL statements contained in `src/config/db.sql` using your MariaDB instance.

6. Start the server:

```bash
npm run dev
```

## External Services

The backend uses the following external services:

- MariaDB
- Open-Meteo API (weather information)

## API Documentation

After starting the server, the OpenAPI documentation is available via Swagger UI at:

```text
http://localhost:3000/api-docs
```
