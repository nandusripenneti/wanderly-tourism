import { useState } from "react";

function BookingModal({ item, type, onClose, onConfirm }) {
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [phone, setPhone] = useState("");

  if (!item) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!date || !phone.trim()) {
      alert("Please fill all details");
      return;
    }

    onConfirm({
      date,
      travellers: Number(travellers),
      phone
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Book {item.name}</h2>
        <p>{type}</p>

        <form onSubmit={handleSubmit}>
          <label>Travel / Booking Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Number of Travellers</label>
          <input
            type="number"
            min="1"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />

          <button type="submit">Submit Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;