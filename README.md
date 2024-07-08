# Health Connect

_Health Connect is a platform to digitalize healthcare industry by having a seamless sharing and stoarage of medical records and connecting doctors with people in need without waiting in queues._

## Tech Stack

- **Frontend**: React + TypeScript, Bootstrap
- **Backend**: Express + TypeScript
- **Database**: MongoDB + AWS S3 (Image Storage)

## API

![Health Connect API-3](https://github.com/usyntest/health-connect/assets/68940203/669ba551-aa00-4d5d-9e28-332830c67e54)

### API ROUTES

#### AUTHENTICATION

- `/auth/login` **(POST)** - Login
- `/auth/register` **(POST)** - Register a user

#### USER

- `/user` **(GET)** - Get a user details

#### APPOINTMENTS

- `/appointment/create` **(POST)** - Create an appointment
- `/appointment/status` **(POST)** - Change status of an appointment
- `/appointment/all` **(GET)** - Get all appointments of an user
- `/appointment/change` **(POST)** - Change timing of an appointment
- `/appointment/:id` **(GET)** - Get details of an appointment

#### DOCUMENTS

- `/document/:id` **(GET)** - Get a document
- `/document/all` **(GET)** - Get all user document

## DATABASE

![Database design](https://github.com/usyntest/health-connect/assets/68940203/a4b04c2c-8d3d-4505-83ac-3aa6975a119d)
