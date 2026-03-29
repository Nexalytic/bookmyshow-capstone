const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 SPEC REQUIREMENT → PORT 8080
const PORT = 8080;

// ⭐ Enable CORS
app.use(cors());

// Middleware
app.use(express.json());


// ======================================================
// 🔥 MongoDB Connection (FIXED)
// ======================================================

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("❌ MONGO_URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));


// ======================================================
// 🔥 BOOKING SCHEMA
// ======================================================

const bookingSchema = new mongoose.Schema({
  movie: String,
  seats: Object,
  slot: String,
  bookingTime: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);


// 🟢 Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ======================================================
// 🔥 POST /api/booking
// ======================================================

app.post("/api/booking", async (req, res) => {
  try {
    const { movie, seats, slot } = req.body;

    if (!movie) {
      return res.status(400).json({ message: "movie is required" });
    }

    if (!seats || typeof seats !== "object") {
      return res.status(400).json({ message: "seats object is required" });
    }

    if (!slot) {
      return res.status(400).json({ message: "slot is required" });
    }

    const newBooking = new Booking({ movie, seats, slot });
    await newBooking.save();

    res.status(200).json({ message: "booking successful" });

  } catch (error) {
    res.status(500).json({
      message: "Error saving booking",
      error,
    });
  }
});


// ======================================================
// 🔥 GET /api/booking
// ======================================================

app.get("/api/booking", async (req, res) => {
  try {
    const latestBooking = await Booking
      .findOne()
      .sort({ bookingTime: -1 });

    if (!latestBooking) {
      return res.json({ message: "no previous booking found" });
    }

    res.json({
      movie: latestBooking.movie,
      seats: latestBooking.seats,
      slot: latestBooking.slot,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error,
    });
  }
});


// ======================================================
// 🟢 START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
