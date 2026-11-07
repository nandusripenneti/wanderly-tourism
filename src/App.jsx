
import { useEffect, useState } from "react";
import "./style.css";

const initialPlaces = [
  { id: 1, name: "Goa", country: "India", category: "Beach", price: 8999, rating: 4.8, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900", description: "Golden beaches, nightlife and beautiful sunsets." },
  { id: 2, name: "Manali", country: "India", category: "Mountain", price: 12999, rating: 4.9, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900", description: "Snowy mountains and peaceful Himalayan views." },
  { id: 3, name: "Bali", country: "Indonesia", category: "Beach", price: 32999, rating: 4.9, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900", description: "Tropical beaches, temples and island adventures." },
  { id: 4, name: "Paris", country: "France", category: "City", price: 45999, rating: 4.7, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900", description: "Romantic streets, art and iconic landmarks." },
  { id: 5, name: "Kerala", country: "India", category: "Nature", price: 10999, rating: 4.8, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900", description: "Green landscapes and beautiful backwaters." },
  { id: 6, name: "Darjeeling", country: "India", category: "Mountain", price: 14999, rating: 4.6, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900", description: "Tea gardens, hills and mountain views." }
];

const initialHotels = [
  { id: 101, name: "Taj Resort & Spa", location: "Goa, India", category: "Luxury Resort", price: 6500, rating: 4.9, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900", description: "Beautiful resort with swimming pool and beach views." },
  { id: 102, name: "Mountain View Resort", location: "Manali, India", category: "Mountain Hotel", price: 4200, rating: 4.7, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900", description: "Comfortable stay with stunning mountain scenery." },
  { id: 103, name: "Bali Paradise Stay", location: "Bali, Indonesia", category: "Beach Resort", price: 8500, rating: 4.9, image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=900", description: "Relax in a tropical resort with premium facilities." },
  { id: 104, name: "City Comfort Hotel", location: "Paris, France", category: "City Hotel", price: 9500, rating: 4.6, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900", description: "Modern hotel close to popular city attractions." }
];

const initialVehicles = [
  { id: 201, name: "Swift Dzire", type: "Sedan Car", price: 1800, rating: 4.7, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900", description: "Comfortable car for city trips and family travel." },
  { id: 202, name: "Toyota Innova", type: "SUV Car", price: 2800, rating: 4.9, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900", description: "Spacious vehicle suitable for group journeys." },
  { id: 203, name: "Royal Enfield", type: "Bike Rental", price: 900, rating: 4.8, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900", description: "Explore destinations on a comfortable motorcycle." },
  { id: 204, name: "Tempo Traveller", type: "Group Vehicle", price: 4500, rating: 4.8, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900", description: "Spacious travel option for family and group tours." }
];

function readData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [places, setPlaces] = useState(() => readData("wanderly_places", initialPlaces));
  const [hotels, setHotels] = useState(() => readData("wanderly_hotels", initialHotels));
  const [vehicles, setVehicles] = useState(() => readData("wanderly_vehicles", initialVehicles));
  const [users, setUsers] = useState(() => readData("wanderly_users", []));
  const [bookings, setBookings] = useState(() => readData("wanderly_bookings", []));
  const [currentUser, setCurrentUser] = useState(() => readData("wanderly_session", null));

  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [authMode, setAuthMode] = useState("login");
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [bookingForm, setBookingForm] = useState({ date: "", travelers: "1", phone: "" });
  const [newPlace, setNewPlace] = useState({
    name: "", country: "", category: "Beach", price: "", image: "", description: ""
  });

  useEffect(() => {
    localStorage.setItem("wanderly_places", JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem("wanderly_hotels", JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem("wanderly_vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem("wanderly_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("wanderly_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("wanderly_session", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("wanderly_session");
    }
  }, [currentUser]);

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  };

  const goTo = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredPlaces = places.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.country.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && (category === "All" || item.category === category);
  });

  const logout = () => {
    setCurrentUser(null);
    goTo("home");
    showMessage("Logged out successfully.");
  };

  const handleAuth = (event) => {
    event.preventDefault();

    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password;

    if (email === "admin@wanderly.com" && password === "Admin@123" && authMode === "login") {
      setCurrentUser({ name: "Administrator", email, role: "admin" });
      goTo("admin");
      showMessage("Admin login successful!");
      return;
    }

    if (authMode === "signup") {
      if (!authForm.name.trim()) {
        showMessage("Please enter your name.");
        return;
      }

      if (users.some((user) => user.email === email)) {
        showMessage("Email already registered. Please login.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: authForm.name.trim(),
        email,
        password,
        role: "user"
      };

      setUsers((previous) => [...previous, newUser]);
      setCurrentUser({ name: newUser.name, email, role: "user" });
      goTo("home");
      showMessage("Account created successfully!");
      return;
    }

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      showMessage("Invalid email or password.");
      return;
    }

    setCurrentUser({
      name: foundUser.name,
      email: foundUser.email,
      role: "user"
    });
    goTo("home");
    showMessage("Welcome back!");
  };

  const openBooking = (item, type) => {
    if (!currentUser) {
      setAuthMode("login");
      goTo("auth");
      showMessage("Please login before booking.");
      return;
    }

    if (currentUser.role !== "user") {
      showMessage("Please use a user account to book.");
      return;
    }

    setSelectedItem({ ...item, serviceType: type });
    setBookingForm({ date: "", travelers: "1", phone: "" });
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (!selectedItem) return;

    const booking = {
      id: Date.now(),
      userEmail: currentUser.email,
      userName: currentUser.name,
      itemName: selectedItem.name,
      serviceType: selectedItem.serviceType,
      price: selectedItem.price,
      date: bookingForm.date,
      travelers: Number(bookingForm.travelers),
      phone: bookingForm.phone,
      status: "Pending"
    };

    setBookings((previous) => [booking, ...previous]);
    setSelectedItem(null);
    goTo("mybookings");
    showMessage("Booking request submitted successfully!");
  };

  const cancelBooking = (id) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id && booking.status === "Pending"
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
    showMessage("Booking cancelled.");
  };

  const updateBookingStatus = (id, status) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
    showMessage("Booking status updated.");
  };

  const addDestination = (event) => {
    event.preventDefault();

    if (!newPlace.name.trim() || !newPlace.country.trim() || !newPlace.price) {
      showMessage("Please fill in destination name, country and price.");
      return;
    }

    const destination = {
      ...newPlace,
      id: Date.now(),
      price: Number(newPlace.price),
      rating: 4.5,
      image: newPlace.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
    };

    setPlaces((previous) => [...previous, destination]);
    setNewPlace({
      name: "", country: "", category: "Beach", price: "", image: "", description: ""
    });
    showMessage("Destination added successfully!");
  };

  const deleteDestination = (id) => {
    setPlaces((previous) => previous.filter((place) => place.id !== id));
    showMessage("Destination deleted.");
  };

  const myBookings = bookings.filter(
    (booking) => booking.userEmail === currentUser?.email
  );

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => goTo("home")}>
          <span className="brand-icon">✈</span>Wanderly<span className="brand-dot">.</span>
        </button>

        <nav className="nav-links">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("destinations")}>Destinations</button>
          <button onClick={() => goTo("hotels")}>Hotels</button>
          <button onClick={() => goTo("vehicles")}>Vehicles</button>
          <button onClick={() => goTo("packages")}>Packages</button>
          {currentUser?.role === "user" && (
            <button onClick={() => goTo("mybookings")}>My Bookings</button>
          )}
          {currentUser?.role === "admin" && (
            <button onClick={() => goTo("admin")}>Admin</button>
          )}
        </nav>

        <div className="nav-account">
          {currentUser ? (
            <>
              <span className="welcome">Hi, {currentUser.name.split(" ")[0]}</span>
              <button className="outline-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="primary-btn" onClick={() => goTo("auth")}>Login / Signup</button>
          )}
        </div>
      </header>

      {message && <div className="toast">{message}</div>}

      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <span className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>
              <h1>Explore the world.<br /><span>Make memories.</span></h1>
              <p>Discover amazing destinations, comfortable hotels and convenient vehicles. Plan your next journey with Wanderly.</p>
              <div className="hero-actions">
                <button className="primary-btn large" onClick={() => goTo("destinations")}>Explore Destinations →</button>
                <button className="light-btn" onClick={() => goTo("hotels")}>Find Hotels</button>
              </div>
            </div>
            <div className="hero-card">
              <span>✦ TRAVEL SMARTER</span>
              <h3>Your journey, your way.</h3>
              <p>Discover places, stays and rides in one platform.</p>
            </div>
          </section>

          <section className="search-section">
            <div>
              <span className="eyebrow">FIND YOUR NEXT TRIP</span>
              <h2>Where do you want to go?</h2>
            </div>
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search destinations or countries..."
              />
              <button className="primary-btn" onClick={() => goTo("destinations")}>Search</button>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">HANDPICKED FOR YOU</span>
                <h2>Popular destinations</h2>
                <p>Explore places loved by travellers.</p>
              </div>
              <button className="text-btn" onClick={() => goTo("destinations")}>View all →</button>
            </div>
            <div className="destination-grid">
              {places.slice(0, 3).map((place) => (
                <DestinationCard key={place.id} place={place} onBook={openBooking} />
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">STAY COMFORTABLY</span>
                <h2>Featured hotels</h2>
                <p>Find a stay for your next adventure.</p>
              </div>
              <button className="text-btn" onClick={() => goTo("hotels")}>View all →</button>
            </div>
            <div className="destination-grid">
              {hotels.slice(0, 3).map((hotel) => (
                <ServiceCard key={hotel.id} item={hotel} location={hotel.location} type="Hotel" priceLabel="/ night" onBook={openBooking} />
              ))}
            </div>
          </section>

          <section className="feature-strip">
            <div><strong>✈</strong><h3>Easy planning</h3><p>Explore trips in one place.</p></div>
            <div><strong>⌂</strong><h3>Comfortable stays</h3><p>Discover hotels for your journey.</p></div>
            <div><strong>🚗</strong><h3>Convenient rides</h3><p>Choose vehicles for your travel.</p></div>
          </section>
        </>
      )}

      {page === "destinations" && (
        <main className="section page-content">
          <span className="eyebrow">EXPLORE THE WORLD</span>
          <h1 className="page-title">Discover destinations</h1>
          <p className="muted">Find the perfect place for your next adventure.</p>
          <div className="filter-bar">
            <input className="search-input" placeholder="Search destination or country" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {["All", "Beach", "Mountain", "City", "Nature"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="destination-grid">
            {filteredPlaces.map((place) => <DestinationCard key={place.id} place={place} onBook={openBooking} />)}
          </div>
          {filteredPlaces.length === 0 && <p className="empty">No destinations found.</p>}
        </main>
      )}

      {page === "hotels" && (
        <main className="section page-content">
          <span className="eyebrow">COMFORTABLE STAYS</span>
          <h1 className="page-title">Find your perfect hotel</h1>
          <p className="muted">Discover comfortable stays at beautiful destinations.</p>
          <div className="destination-grid">
            {hotels.map((hotel) => (
              <ServiceCard key={hotel.id} item={hotel} location={hotel.location} type="Hotel" priceLabel="/ night" onBook={openBooking} />
            ))}
          </div>
        </main>
      )}

      {page === "vehicles" && (
        <main className="section page-content">
          <span className="eyebrow">TRAVEL YOUR WAY</span>
          <h1 className="page-title">Choose your vehicle</h1>
          <p className="muted">Select a vehicle for your next journey.</p>
          <div className="destination-grid">
            {vehicles.map((vehicle) => (
              <ServiceCard key={vehicle.id} item={vehicle} location={vehicle.type} type="Vehicle" priceLabel="/ day" onBook={openBooking} />
            ))}
          </div>
        </main>
      )}

      {page === "packages" && (
        <main className="section page-content">
          <span className="eyebrow">TRAVEL MADE SIMPLE</span>
          <h1 className="page-title">Explore our tour packages</h1>
          <p className="muted">Choose a destination and send your booking request.</p>
          <div className="destination-grid">
            {places.map((place) => <DestinationCard key={place.id} place={place} onBook={openBooking} />)}
          </div>
        </main>
      )}

      {page === "auth" && (
        <main className="auth-page">
          <div className="auth-image">
            <span className="eyebrow">WANDERLY TRAVEL COMMUNITY</span>
            <h1>Every journey<br />begins with a dream.</h1>
            <p>Create your account and start exploring.</p>
          </div>
          <form className="auth-card" onSubmit={handleAuth}>
            <span className="eyebrow">WELCOME TO WANDERLY</span>
            <h2>{authMode === "login" ? "Welcome back" : "Create account"}</h2>
            <p className="muted">{authMode === "login" ? "Login to continue your journey." : "Sign up to discover amazing places."}</p>

            {authMode === "signup" && (
              <label>Full name
                <input required value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Enter your name" />
              </label>
            )}
            <label>Email address
              <input required type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="you@example.com" />
            </label>
            <label>Password
              <input required type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="Enter password" />
            </label>
            <button className="primary-btn full-btn" type="submit">{authMode === "login" ? "Login" : "Create account"}</button>
            <p className="switch-auth">
              {authMode === "login" ? "New to Wanderly?" : "Already have an account?"}
              <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                {authMode === "login" ? " Sign up" : " Login"}
              </button>
            </p>
            <div className="demo-note">
              <strong>Demo Admin Login</strong>
              <span>Email: admin@wanderly.com</span>
              <span>Password: Admin@123</span>
            </div>
          </form>
        </main>
      )}

      {page === "mybookings" && currentUser?.role === "user" && (
        <main className="section page-content">
          <span className="eyebrow">YOUR TRAVEL PLANS</span>
          <h1 className="page-title">My bookings</h1>
          <p className="muted">View and manage your trip, hotel and vehicle requests.</p>
          {myBookings.length === 0 ? (
            <div className="empty-card">
              <h2>No bookings yet</h2>
              <p>Your next adventure is waiting for you.</p>
              <button className="primary-btn" onClick={() => goTo("destinations")}>Explore destinations</button>
            </div>
          ) : (
            <div className="booking-list">
              {myBookings.map((booking) => (
                <div className="booking-row" key={booking.id}>
                  <div>
                    <span className="service-label">{booking.serviceType}</span>
                    <h3>{booking.itemName}</h3>
                    <p>Travel date: {booking.date} · Travellers: {booking.travelers}</p>
                    <p>Contact: {booking.phone}</p>
                    <strong>₹{booking.price.toLocaleString("en-IN")} {booking.serviceType === "Hotel" ? "per night" : booking.serviceType === "Vehicle" ? "per day" : "per person"}</strong>
                  </div>
                  <div className="booking-actions">
                    <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                    {booking.status === "Pending" && (
                      <button className="outline-btn" onClick={() => cancelBooking(booking.id)}>Cancel</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {page === "admin" && currentUser?.role === "admin" && (
        <main className="section page-content">
          <span className="eyebrow">MANAGEMENT PANEL</span>
          <h1 className="page-title">Admin dashboard</h1>
          <p className="muted">Manage destinations and customer booking requests.</p>

          <div className="stats-grid">
            <div className="stat-card"><span>Destinations</span><strong>{places.length}</strong></div>
            <div className="stat-card"><span>Registered users</span><strong>{users.length}</strong></div>
            <div className="stat-card"><span>Total bookings</span><strong>{bookings.length}</strong></div>
            <div className="stat-card"><span>Pending bookings</span><strong>{bookings.filter((b) => b.status === "Pending").length}</strong></div>
          </div>

          <div className="admin-grid">
            <section className="admin-panel">
              <h2>Add destination</h2>
              <form onSubmit={addDestination} className="admin-form">
                <input placeholder="Destination name" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} required />
                <input placeholder="Country" value={newPlace.country} onChange={(e) => setNewPlace({ ...newPlace, country: e.target.value })} required />
                <select value={newPlace.category} onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}>
                  <option>Beach</option><option>Mountain</option><option>City</option><option>Nature</option>
                </select>
                <input type="number" min="1" placeholder="Price in INR" value={newPlace.price} onChange={(e) => setNewPlace({ ...newPlace, price: e.target.value })} required />
                <input placeholder="Image URL (optional)" value={newPlace.image} onChange={(e) => setNewPlace({ ...newPlace, image: e.target.value })} />
                <textarea placeholder="Short description" value={newPlace.description} onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })} />
                <button className="primary-btn" type="submit">Add destination</button>
              </form>
            </section>

            <section className="admin-panel">
              <h2>Manage destinations</h2>
              {places.map((place) => (
                <div className="manage-row" key={place.id}>
                  <span>{place.name} · ₹{place.price.toLocaleString("en-IN")}</span>
                  <button className="delete-btn" onClick={() => deleteDestination(place.id)}>Delete</button>
                </div>
              ))}
            </section>
          </div>

          <section className="admin-panel booking-admin">
            <h2>Customer bookings</h2>
            {bookings.length === 0 ? <p className="muted">No booking requests yet.</p> : bookings.map((booking) => (
              <div className="booking-row" key={booking.id}>
                <div>
                  <span className="service-label">{booking.serviceType}</span>
                  <h3>{booking.itemName}</h3>
                  <p>{booking.userName} · {booking.userEmail}</p>
                  <p>{booking.date} · {booking.travelers} traveller(s) · {booking.phone}</p>
                </div>
                <div className="booking-actions">
                  <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                  <select value={booking.status} onChange={(e) => updateBookingStatus(booking.id, e.target.value)}>
                    <option>Pending</option><option>Confirmed</option><option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </section>
        </main>
      )}

      {page !== "home" && page !== "destinations" && page !== "hotels" &&
        page !== "vehicles" && page !== "packages" && page !== "auth" &&
        page !== "mybookings" && page !== "admin" && (
          <main className="section"><h2>Page not found</h2><button className="primary-btn" onClick={() => goTo("home")}>Go home</button></main>
        )}

      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <form className="booking-modal" onSubmit={submitBooking} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-btn" onClick={() => setSelectedItem(null)}>×</button>
            <span className="eyebrow">PLAN YOUR TRIP</span>
            <h2>Book {selectedItem.name}</h2>
            <p className="muted">{selectedItem.serviceType} · Starting from ₹{selectedItem.price.toLocaleString("en-IN")} {selectedItem.serviceType === "Hotel" ? "per night" : selectedItem.serviceType === "Vehicle" ? "per day" : "per person"}.</p>
            <label>Travel / booking date
              <input type="date" required min={new Date().toISOString().split("T")[0]} value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} />
            </label>
            <label>Number of travellers
              <input type="number" min="1" max="20" required value={bookingForm.travelers} onChange={(e) => setBookingForm({ ...bookingForm, travelers: e.target.value })} />
            </label>
            <label>Contact number
              <input type="tel" required pattern="[0-9]{10}" title="Enter a 10 digit phone number" placeholder="10-digit mobile number" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} />
            </label>
            <button className="primary-btn full-btn" type="submit">Submit booking request</button>
          </form>
        </div>
      )}

      <footer className="footer">
        <div className="footer-brand">✈ Wanderly.</div>
        <p>Discover more. Travel better. Make memories.</p>
        <span>© 2026 Wanderly Travel & Tourism · Academic project demo</span>
      </footer>
    </div>
  );
}

function DestinationCard({ place, onBook }) {
  return (
    <article className="destination-card">
      <div className="card-image">
        <img src={place.image} alt={place.name} />
        <span className="category-tag">{place.category}</span>
      </div>
      <div className="card-content">
        <div className="card-title-row">
          <h3>{place.name}</h3>
          <span className="rating">★ {place.rating}</span>
        </div>
        <p className="country">⌖ {place.country}</p>
        <p className="description">{place.description}</p>
        <div className="card-bottom">
          <div><span>Starting from</span><strong>₹{place.price.toLocaleString("en-IN")}</strong><span>/ person</span></div>
          <button className="primary-btn" onClick={() => onBook(place, "Destination")}>Book now</button>
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ item, location, type, priceLabel, onBook }) {
  return (
    <article className="destination-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
        <span className="category-tag">{type}</span>
      </div>
      <div className="card-content">
        <div className="card-title-row">
          <h3>{item.name}</h3>
          <span className="rating">★ {item.rating}</span>
        </div>
        <p className="country">⌖ {location}</p>
        <p className="description">{item.description}</p>
        <div className="card-bottom">
          <div><span>Starting from</span><strong>₹{item.price.toLocaleString("en-IN")}</strong><span>{priceLabel}</span></div>
          <button className="primary-btn" onClick={() => onBook(item, type)}>Book now</button>
        </div>
      </div>
    </article>
  );
}

export default App;
