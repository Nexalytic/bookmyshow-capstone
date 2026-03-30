# 🎬 BookMyShow Capstone Project

## 🚀 Live Demo

* Frontend: https://bookmyshowcapstone.netlify.app
* Backend API: https://bookmyshow-capstone-znez.onrender.com/api/booking


⚠️ Note:
The backend is hosted on Render (free tier), which may enter a sleep state after inactivity.
If the application does not respond on first attempt, please wait 30–60 seconds and refresh.
This delay is due to cold start behavior of the hosting service.

---

## 📖 Project Overview

This is a full-stack movie ticket booking application inspired by BookMyShow.

Users can:

* Select a movie
* Choose a time slot
* Book seats
* View last booking details

This project fulfills all capstone requirements:

* Frontend (React)
* Backend (Node.js + Express)
* Database (MongoDB)

---

## ⚙️ Tech Stack

* Frontend: React.js, CSS, Bootstrap
* Backend: Node.js, Express.js
* Database: MongoDB
* Deployment:

  * Frontend → Netlify
  * Backend → Render

---

## 📂 Project Structure

```
BOOKMYSHOW-CAPSTONE/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend_app/
│   └── Book-A-Movie-Ticket-Fullstack-Boilerplate/
│       └── src/
│           ├── client/
│           │   ├── node_modules/
│           │   └── src/
│           │       ├── components/
│           │       │   ├── App.js
│           │       │   └── data.js
│           │       ├── styles/
│           │       │   ├── App.css
│           │       │   └── bootstrap.min.css
│           │       ├── index.js
│           │       ├── index.html
│           │       ├── package.json
│           │       └── webpack.config.js
│
└── .gitignore
```

---

## 🔌 API Documentation

### ✅ 1. Create Booking

**Endpoint:**
POST /api/booking

**Request Body:**

```json
{
  "movie": "Avengers",
  "slot": "10:00 AM",
  "seats": {
    "A1": 2,
    "A2": 1
  }
}
```

**Response:**

```json
{
  "message": "booking successful"
}
```

---

### ✅ 2. Get Last Booking

**Endpoint:**
GET /api/booking

**Response:**

```json
{
  "movie": "Avengers",
  "slot": "10:00 AM",
  "seats": {
    "A1": 2,
    "A2": 1
  }
}
```

**If no booking:**

```json
{
  "message": "no previous booking found"
}
```

---

## 🎯 Features Implemented

* Movie selection UI
* Slot selection UI
* Seat input handling
* Dynamic class updates (UI highlight)
* Booking API integration
* Last booking display
* LocalStorage persistence
* Input validation
* Single POST request optimization

---

## 🔄 Application Flow

1. Select movie
2. Select slot
3. Enter seats
4. Click "Book Now"
5. Data saved in database
6. UI resets
7. Last booking displayed

---

## 🧠 Important Notes

* Only one POST request used for booking (as required)
* No extra GET request after booking
* LocalStorage used for persistence
* Backend strictly follows required API structure

---

## 🧪 Acceptance Criteria Covered

* Proper UI structure
* Correct class names
* Last booking display
* Database storage
* API endpoints working
* LocalStorage persistence

---

## 🏁 Conclusion

This project successfully fulfills all capstone requirements including frontend, backend, database integration, and deployment.

---

## 🙌 Author

Deepak Raj

