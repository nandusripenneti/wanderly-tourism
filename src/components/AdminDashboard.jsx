function AdminDashboard({
  destinations,
  bookings,
  onAddDestination,
  onDeleteDestination,
  onUpdateBooking
}) {
  function addDestination() {
    const name = prompt("Enter destination name:");
    if (!name || !name.trim()) return;

    const country = prompt("Enter country:");
    const price = Number(prompt("Enter starting price:"));

    if (!country || !Number.isFinite(price) || price <= 0) {
      alert("Enter valid destination details");
      return;
    }

    onAddDestination({
      id: Date.now(),
      name: name.trim(),
      country,
      price,
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    });
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>{destinations.length}</h2>
          <p>Destinations</p>
        </div>

        <div className="stat-card">
          <h2>{bookings.length}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h2>{bookings.filter(b => b.status === "Pending").length}</h2>
          <p>Pending Bookings</p>
        </div>
      </div>

      <section>
        <h2>Manage Destinations</h2>
        <button onClick={addDestination}>+ Add Destination</button>

        {destinations.map((destination) => (
          <div className="admin-row" key={destination.id}>
            <span>{destination.name} – ₹{destination.price}</span>
            <button
              className="danger-btn"
              onClick={() => onDeleteDestination(destination.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2>All Booking Requests</h2>

        {bookings.length === 0 && <p>No bookings available.</p>}

        {bookings.map((booking) => (
          <div className="admin-row" key={booking.id}>
            <div>
              <strong>{booking.itemName}</strong>
              <p>{booking.type} | {booking.userEmail}</p>
              <p>Date: {booking.date} | Status: {booking.status}</p>
            </div>

            <select
              value={booking.status}
              onChange={(e) =>
                onUpdateBooking(booking.id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminDashboard;