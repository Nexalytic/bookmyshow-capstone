const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 SPEC REQUIREMENT → PORT 8080
const PORT = 8080;

// ⭐ Enable CORS (keep — needed for frontend)
app.use(cors());

// Middleware
app.use(express.json());


// 🟢 Connect to MongoDB (UNCHANGED)
mongoose
  .connect("mongodb://localhost:27017/bookmyshow")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));


// ======================================================
// 🔥 SPEC-PERFECT BOOKING SCHEMA
// ======================================================
// Must match: { movie, seats: {A1:2,...}, slot }

const bookingSchema = new mongoose.Schema({
  movie: String,
  seats: Object, // seat-type counts (A1:2, A2:0, etc.)
  slot: String,
  bookingTime: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);


// 🟢 Test route (safe to keep)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ======================================================
// 🔥 SPEC-PERFECT POST /api/booking
// ======================================================

app.post("/api/booking", async (req, res) => {
  try {
    const { movie, seats, slot } = req.body;

    // 🔴 BASIC VALIDATION (spec-safe)

    if (!movie) {
      return res.status(400).json({ message: "movie is required" });
    }

    if (!seats || typeof seats !== "object") {
      return res.status(400).json({ message: "seats object is required" });
    }

    if (!slot) {
      return res.status(400).json({ message: "slot is required" });
    }

    // 🟢 Save booking
    const newBooking = new Booking({ movie, seats, slot });
    await newBooking.save();

    // 🔥 SPEC → Must return 200 on success
    res.status(200).json({ message: "booking successful" });

  } catch (error) {
    res.status(500).json({
      message: "Error saving booking",
      error,
    });
  }
});


// ======================================================
// 🔥 SPEC-PERFECT GET /api/booking (LAST BOOKING)
// ======================================================

app.get("/api/booking", async (req, res) => {
  try {
    const latestBooking = await Booking
      .findOne()
      .sort({ bookingTime: -1 });

    // 🔥 SPEC → If none found
    if (!latestBooking) {
      return res.json({ message: "no previous booking found" });
    }

    // 🔥 SPEC → Return only required fields
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