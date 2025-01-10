# event-booking-system

Detailed Guide to Address Your Requirements
Below are the steps and guidelines to create the necessary documentation and setup for your project.

## Code Description

This project is a Node.js-based Event Booking System designed to manage events, track user bookings, and optimize performance using caching and messaging.

### Key Components
1. **API**: 
   - Implements RESTful endpoints for managing events, bookings, and retrieving booking counts.
   - Endpoints:
     - `POST /api/events`: Create an event.
     - `POST /api/bookings`: Book an event.
     - `GET /api/events/:id/bookings/count`: Get booking count for a specific event.

3. **Database (MySQL)**:
   - Stores event and booking data.
   - Ensures constraints like unique bookings and capacity checks.

4. **Flow of the System**:
   - API interacts with MySQL to store and fetch data.
   - Redis is queried for cached booking counts, falling back to MySQL if data is not found.
   - RabbitMQ handles asynchronous tasks like email notifications.

## Pre-requisites
- Node.js v14.x or higher
- MySQL

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DeepthyAT/event-booking-system.git
cd event-booking-system

## how to set up the environment

- npm install
### Set up database
- mysql -u root -p event_booking_system < db/database_dump.sql

## How to configure the application

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=event_booking_system

## How to run the application
node server.js

## How to test the application
Use Postman or any API testing tool to test the endpoints:
- Method: POST
- URL: http://localhost:3000/api/events
- Body (JSON):
    {
    "eventName": "Sample Event",
    "capacity": 100
    }
- Method: POST
- URL: http://localhost:3000/api/bookings
- Body (JSON):
    {
    "userId": 1,
    "eventId": 1
    }
- Method: GET
- URL: http://localhost:3000/api/events/1/bookings/count
