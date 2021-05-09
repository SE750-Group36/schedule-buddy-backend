# Schedule buddy Server

An API server containing endpoints CRUD endpoints required for scheduling in the client.

This server runs on http://localhost:3001/

## Installation

Install node.js from https://nodejs.org/en/.

Run the following commands:

```bash
git clone https://github.com/SE750-Group36/schedule-buddy-backend.git


npm i
```

## Usage

### IMPORTANT:

To run the server, you must put the provided .env file provided into the root directory of the project. The file should be provided to you by the tutor, if you do not have this then please feel free to contact <a href="xyan765@aucklanduni.ac.nz">Charlie</a>

```bash
npm start
```

### Endpoints:

---

-   Crud endpoints for the Calendar:
    http://localhost:3001/api/calendar

-   Crud endpoints for the Schedule:
    http://localhost:3001/api/schedule

---

## Testing

For unit testing, Jest and Supertest are being used.

To run tests:

```
npm test
```
