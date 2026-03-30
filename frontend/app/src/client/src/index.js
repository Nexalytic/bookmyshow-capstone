import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { movies, slots, seats } from "./data";
import "./styles/App.css"; // ✅ IMPORTANT

function App() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [seatCounts, setSeatCounts] = useState({});
  const [message, setMessage] = useState("");
  const [lastBooking, setLastBooking] = useState(null);

  useEffect(() => {
    fetchLastBooking();

    const savedMovie = localStorage.getItem("movie");
    const savedSlot = localStorage.getItem("slot");
    const savedSeats = localStorage.getItem("seats");

    if (savedMovie) setSelectedMovie(savedMovie);
    if (savedSlot) setSelectedSlot(savedSlot);
    if (savedSeats) setSeatCounts(JSON.parse(savedSeats));
  }, []);

  const fetchLastBooking = async () => {
    try {
      const res = await fetch("https://bookmyshow-capstone-znez.onrender.com/api/booking");
      const data = await res.json();

      if (data.message === "no previous booking found") {
        setLastBooking(null);
      } else {
        setLastBooking(data);
      }
    } catch {
      console.log("Error fetching last booking");
    }
  };

  const validateInputs = () => {
    if (!selectedMovie) return "Select a movie ❌";
    if (!selectedSlot) return "Select a slot ❌";

    const totalSeats = Object.values(seatCounts).reduce(
      (a, b) => a + Number(b || 0),
      0
    );

    if (totalSeats === 0) return "Select at least 1 seat ❌";

    return null;
  };

  const handleSeatChange = (seat, value) => {
    const updated = {
      ...seatCounts,
      [seat]: value === "" ? "" : Number(value),
    };

    setSeatCounts(updated);
    localStorage.setItem("seats", JSON.stringify(updated));
  };

  const handleBooking = async () => {
    const error = validateInputs();
    if (error) {
      setMessage(error);
      return;
    }

    const bookingData = {
      movie: selectedMovie,
      seats: seatCounts,
      slot: selectedSlot,
    };

    try {
      const res = await fetch("https://bookmyshow-capstone-znez.onrender.com/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);

        localStorage.setItem("movie", selectedMovie);
        localStorage.setItem("slot", selectedSlot);
        localStorage.setItem("seats", JSON.stringify(seatCounts));

        setLastBooking(bookingData);
        setSeatCounts({});

        // ✅ FIX ADDED (NO OTHER CHANGES)
        setSelectedMovie("");
        setSelectedSlot("");

      } else {
        setMessage("Booking failed ❌");
      }
    } catch {
      setMessage("Booking failed ❌");
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 Book Movie Ticket</h1>

      {/* 🎥 MOVIES */}
      <h3>Select Movie</h3>
      <div className="movie-row">
        {movies.map((movie) => (
          <div
            key={movie}
            className={
              selectedMovie === movie
                ? "movie-column movie-column-selected"
                : "movie-column"
            }
            onClick={() => {
              setSelectedMovie(movie);
              localStorage.setItem("movie", movie);
            }}
          >
            {movie}
          </div>
        ))}
      </div>

      {/* ⏰ SLOTS */}
      <h3>Select Slot</h3>
      <div className="slot-row">
        {slots.map((s) => (
          <button
            key={s}
            className={
              selectedSlot === s
                ? "slot-column slot-column-selected"
                : "slot-column"
            }
            onClick={() => {
              setSelectedSlot(s);
              localStorage.setItem("slot", s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 💺 SEATS */}
      <h3>Select Seats</h3>
      <div className="seat-row">
        {seats.map((seat) => (
          <div
            key={seat}
            className={
              seatCounts[seat] > 0
                ? "seat-column seat-column-selected"
                : "seat-column"
            }
          >
            <p>Type {seat}</p>
            <input
              id={`seat-${seat}`}
              type="number"
              min="0"
              value={
                seatCounts[seat] === undefined
                  ? ""
                  : seatCounts[seat]
              }
              onChange={(e) =>
                handleSeatChange(seat, e.target.value)
              }
            />
          </div>
        ))}
      </div>

      <button className="book-btn" onClick={handleBooking}>
        Book Now
      </button>

      <h3>{message}</h3>

      {/* 📊 LAST BOOKING */}
      <div className="last-order">
        <h2>Last Booking Details</h2>

        {!lastBooking ? (
          <p>No previous booking found</p>
        ) : (
          <div>
            <p><strong>Movie:</strong> {lastBooking.movie}</p>
            <p><strong>Slot:</strong> {lastBooking.slot}</p>
            <p><strong>Seats:</strong></p>
            <ul>
              {Object.entries(lastBooking.seats).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
