
# ⚠️ HackFit - Real-time Threat Reporting and Notification System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://img.shields.io/badge/build-passing-brightgreen.svg)

A platform for users to report threats in real-time and receive notifications about potential dangers in their vicinity.

## Features

*   🔧 **User Authentication**: Secure signup and login functionality for user accounts.
*   📍 **Threat Reporting**: Users can report threats with location data (latitude and longitude) and descriptions.
*   🚨 **Real-time Notifications**: SMS notifications are sent to users when threats are detected nearby.
*   🗺️ **Location-Based Alerts**: Alerts tailored to the user's current location.
*   📱 **SMS Integration**: Utilizes Twilio for sending SMS notifications.
*   🛡️ **Data Security**: Secure handling of user data and threat reports.

## Tech Stack

| Category   | Technologies                      | Documentation                                                                             |
|------------|-----------------------------------|-----------------------------------------------------------------------------------------|
| Backend    | Node.js                         | [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)                                |
| Backend    | Express                           | [https://expressjs.com/](https://expressjs.com/)                                         |
| Database   | MongoDB                           | [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)                            |
| Database   | Mongoose                          | [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)                            |
| SMS        | Twilio                            | [https://www.twilio.com/docs](https://www.twilio.com/docs)                               |
| Other      | CORS                              | [https://github.com/expressjs/cors](https://github.com/expressjs/cors)                   |
| Other      | dotenv                            | [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)                 |
| Development| Nodemon                           | [https://nodemon.io/](https://nodemon.io/)                                               |

## Quick Start

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB (running locally or remotely)
*   Twilio Account (for SMS notifications)

### Installation

bash
git clone [repo-url]
cd HackFit
npm install
# or
yarn install


### Environment

Create a `.env` file in the root directory with the following environment variables:

env
PORT=3000
DB_URI=mongodb://localhost:27017/hackathon
ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx # Your Twilio Account SID
AUTH_TOKEN=your_auth_token           # Your Twilio Auth Token
PHONE_NUMBER=+1234567890               # Your Twilio Phone Number


> [!NOTE]
> Replace `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`, `your_auth_token`, and `+1234567890` with your actual Twilio credentials.

## Development

### Commands

bash
npm run start  # Start the development server
# or
yarn start


### Testing

Currently, no dedicated testing framework is implemented. Manual testing is recommended. Future versions will include unit and integration tests.

## API Reference

| Method | Endpoint     | Body                                             | Response                                                                                                                               |
|--------|--------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| POST   | /user/signup | `{ name: "John", phoneNumber: "1234567890", password: "password" }` | `201 Created` - `{ message: "User created successfully", user: { id: "...", name: "John", phoneNumber: "1234567890" } }` |
| POST   | /user/login  | `{ phoneNumber: "1234567890", password: "password" }`               | `200 OK` - `{ message: "success", user: { id: "...", name: "John", phoneNumber: "1234567890" } }`                     |
| POST   | /animals    | `{ lat: 37.7749, lng: -122.4194, animal: "Dog", description: { users: "user_id", about: "Lost dog" } }`                                                                                                        | `200 OK` - The saved animal record                                                   |
| GET    | /animals     |                                                  | `200 OK` - Array of animal objects                                                                                                   |

## Deployment

### Dockerfile

While a Dockerfile is not provided in the original file list, here's a basic example for containerizing the application:

dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]


To build and run the Docker image:

bash
docker build -t hackfit .
docker run -p 3000:3000 hackfit


### Platform Guides

*   **Heroku**: Deploy using the Heroku CLI and setting the necessary environment variables.
*   **AWS**: Deploy to EC2 or Elastic Beanstalk with proper security configurations.

## Contributing

We welcome contributions to HackFit! To contribute:

*   Create a new branch with a descriptive name: `feat/new-feature`, `bugfix/issue-description`, or `chore/refactor`.
*   Write clear, concise commit messages following the Conventional Commits standard.
*   Submit a pull request with a detailed description of the changes.
*   Adhere to the project's code style and best practices.
