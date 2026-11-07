import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import DestinationCard from "./components/DestinationCard";
import ServiceCard from "./components/ServiceCard";
import BookingModal from "./components/BookingModal";
import AuthForm from "./components/AuthForm";
import AdminDashboard from "./components/AdminDashboard";

import { destinations as defaultDestinations, hotels, vehicles } from "./data";
import { getData, saveData } from "./utils/storage";

import "./style.css";

function App() {
  const [places, setPlaces] = useState(() =>
    getData("wanderly_places", defaultDestinations)
  );

  const [users, setUsers] = useState(() =>
    getData("wanderly_users", [])
  );

  const [bookings, setBookings] = useState(() =>
    getData("wanderly_bookings", [])
  );

  const [user, setUser] = useState(() =>
    getData("wanderly_session", null)
  );

  const [page, setPage] = useState("Home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    saveData("wanderly_places", places);
  }, [places]);

  useEffect(() => {
    saveData("wanderly_users", users);
  }, [users]);

  useEffect(() => {
    saveData("wanderly_bookings", bookings);
  }, [bookings]);

  useEffect(() => {
    saveData("wanderly_session", user);
  }, [user]);

  function handleSignup(details) {
    const email = details.email.trim().toLowerCase();

    if (users.some((u) => u.email === email)) {
      alert("This email is already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: details.name.trim(),
      email,
      password: details.password,
      role: "user"
    };

    setUsers((previous) => [...previous, newUser]);
    setUser(newUser);
    setPage("Home");

    alert("Registration successful!");
  }

  function handleLogin(details) {
    const email = details.email.trim().toLowerCase();

    if (
      email === "admin@wanderly.com" &&
      details.password === "Admin@123"
    ) {
      setUser({
        name: "Admin",
        email,
        role: "admin"
      });

      setPage("Admin");
      return;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === details.password
    );

    if (foundUser) {
      setUser(foundUser);
      setPage("Home");
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  }

  function handleLogout() {
    setUser(null);
    setPage("Home");
  }

  function openBooking(item, type) {
    if (!user) {
      alert("Please login before booking.");
      setPage("Login");
      return;
    }

    if (user.role === "admin") {
      alert("Admin cannot place user bookings.");
      return;
    }

    setSelectedItem(item);
    setSelectedType(type);
  }

  function confirmBooking(details) {
    const newBooking = {
      id: Date.now(),
      userEmail: user.email,
      itemName: selectedItem.name,
      type: selectedType,
      date: details.date,
      travellers: details.travellers,
      phone: details.phone,
      status: "Pending"
    };

    setBookings((previous) => [...previous, newBooking]);
    setSelectedItem(null);

    alert("Booking request submitted successfully!");
  }

  function cancelBooking(id) {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id && booking.status === "Pending"
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  }

  function addDestination(destination) {
    setPlaces((previous) => [...previous, destination]);
  }

  function deleteDestination(id) {
    if (window.confirm("Delete this destination?")) {
      setPlaces((previous) =>
        previous.filter((destination) => destination.id !== id)
      );
    }
  }

  function updateBooking(id, status) {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  }

  const myBookings = bookings.filter(
    (booking) => booking.userEmail === user?.email
  );

  return (
    <>
      <Navbar
        user={user}
        page={page}
        setPage={setPage}
        onLogout={handleLogout}
      />

      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <p>EXPLORE THE WORLD WITH WANDERLY</p>
                <h1>Your Journey Begins Here.</h1>
                <p>
                  Discover beautiful destinations, comfortable hotels
                  and convenient transportation.
                </p>

                <button onClick={() => setPage("Destinations")}>
                  Explore Destinations
                </button>
              </div>
            </section>

            <section className="section">
              <h2>Popular Destinations</h2>
              <div className="card-grid">
                {places.slice(0, 3).map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onBook={openBooking}
                  />
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Hotels & Stays</h2>
              <div className="card-grid">
                {hotels.slice(0, 3).map((hotel) => (
                  <ServiceCard
                    key={hotel.id}
                    item={hotel}
                    type="Hotel"
                    onBook={openBooking}
                  />
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Travel Vehicles</h2>
              <div className="card-grid">
                {vehicles.slice(0, 3).map((vehicle) => (
                  <ServiceCard
                    key={vehicle.id}
                    item={vehicle}
                    type="Vehicle"
                    onBook={openBooking}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {page === "Destinations" && (
          <section className="section">
            <h1>Explore Destinations</h1>
            <div className="card-grid">
              {places.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onBook={openBooking}
                />
              ))}
            </div>
          </section>
        )}

        {page === "Hotels" && (
          <section className="section">
            <h1>Hotels & Resorts</h1>
            <div className="card-grid">
              {hotels.map((hotel) => (
                <ServiceCard
                  key={hotel.id}
                  item={hotel}
                  type="Hotel"
                  onBook={openBooking}
                />
              ))}
            </div>
          </section>
        )}

        {page === "Vehicles" && (
          <section className="section">
            <h1>Travel Vehicles</h1>
            <div className="card-grid">
              {vehicles.map((vehicle) => (
                <ServiceCard
                  key={vehicle.id}
                  item={vehicle}
                  type="Vehicle"
                  onBook={openBooking}
                />
              ))}
            </div>
          </section>
        )}

        {page === "Packages" && (
          <section className="section">
            <h1>Travel Packages</h1>
            <p className="section-intro">
              Explore our popular travel destinations and plan your next trip.
            </p>

            <div className="card-grid">
              {places.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onBook={openBooking}
                />
              ))}
            </div>
          </section>
        )}

        {page === "Login" && (
          <AuthForm
            onLogin={handleLogin}
            onSignup={handleSignup}
            setPage={setPage}
          />
        )}

        {page === "My Bookings" && (
          <section className="section">
            <h1>My Bookings</h1>

            {myBookings.length === 0 && (
              <p>You have not submitted any bookings yet.</p>
            )}

            {myBookings.map((booking) => (
              <div className="booking-row" key={booking.id}>
                <div>
                  <h3>{booking.itemName}</h3>
                  <p>Type: {booking.type}</p>
                  <p>Date: {booking.date}</p>
                  <p>Travellers: {booking.travellers}</p>
                  <p>Status: <strong>{booking.status}</strong></p>
                </div>

                {booking.status === "Pending" && (
                  <button
                    className="danger-btn"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </section>
        )}

        {page === "Admin" && user?.role === "admin" && (
          <AdminDashboard
            destinations={places}
            bookings={bookings}
            onAddDestination={addDestination}
            onDeleteDestination={deleteDestination}
            onUpdateBooking={updateBooking}
          />
        )}

        {page === "Admin" && user?.role !== "admin" && (
          <section className="section">
            <h2>Admin access required</h2>
            <button onClick={() => setPage("Login")}>Login</button>
          </section>
        )}
      </main>

      <footer className="footer">
        <h2>Wanderly</h2>
        <p>Explore more. Travel better.</p>
        <p>© 2026 Wanderly Tourism Platform</p>
      </footer>

      {selectedItem && (
        <BookingModal
          item={selectedItem}
          type={selectedType}
          onClose={() => setSelectedItem(null)}
          onConfirm={confirmBooking}
        />
      )}
    </>
  );
}

export default App;