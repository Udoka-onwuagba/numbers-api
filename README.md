# Number Classification API

The **Number Classification API** is a backend service that classifies numbers based on their mathematical properties (e.g., prime, perfect, Armstrong, even/odd). It provides fun facts about numbers using an external Numbers API or generates fallback facts if the API is unavailable.

This project is built using **Node.js**, **Express**, and **Docker**.

## Table of Contents
1. Features 
2. Prerequisites
3. Project Structure
4. Setup Instructions
5. API Documentation
6. Contributing
7. License

## Features
* **Mathematical Properties**: Determines if a number is prime, perfect, Armstrong, even, or odd
* **Fun Facts**: Fetches interesting facts about numbers from the Numbers API or generates fallback facts
* **Validation**: Ensures input numbers are within the range `[0, 999,999]`
* **Error Handling**: Provides meaningful error messages for invalid inputs or server errors
* **Docker Support**: Easily deployable using Docker Compose

## Prerequisites
Before setup, install:
* **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
* **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
* **Node.js (Optional)**: If running without Docker, [install Node.js](https://nodejs.org/)

## Project Structure
```
number-api/
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Dockerfile for building the backend image
├── numberUtils.js             # Utility functions for calculating number properties
├── server.js                  # Main Express server file
├── package.json              # Node.js dependencies and scripts
└── README.md                 # This file
```

## Setup Instructions

### Using Docker Compose
1. Clone the repository:
```bash
git clone https://github.com/your-username/number-api.git
cd number-api
```

2. Build and run:
```bash
docker-compose up --build
```

3. Verify the service:
```bash
curl http://localhost:3000
```

Expected output:
```
Backend is running!
```

4. Test the API:
```bash
curl "http://localhost:3000/api/classify-number?number=371"
```

5. Stop the service:
```bash
docker-compose down
```

### Without Docker
1. Clone the repository:
```bash
git clone https://github.com/citadelict/number-api.git
cd number-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Verify and test as shown in Docker setup steps above.

## API Documentation

**Endpoint:** `GET /api/classify-number`

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| `number` | Number | A positive integer between `0` and `999,999` |

**Response (200 OK)**
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

**Response (400 Bad Request)**
```json
{
  "error": true,
  "message": "Please provide a valid number between 0 and 999,999"
}
```

**Response (500 Internal Server Error)**
```json
{
  "error": true,
  "message": "Failed to process number properties. Please try again."
}
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeatureName`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/YourFeatureName`)
5. Open a pull request

Please ensure code adheres to project standards and includes tests.

## License
This project is licensed under the **MIT License**. See LICENSE file for details.

## Acknowledgments
* **Numbers API**: For providing number facts
* **Docker**: For deployment and environment consistency