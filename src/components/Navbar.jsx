function Navbar({ user, page, setPage, onLogout }) {
  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => setPage("Home")}>
        Wanderly
      </h2>

      <div className="nav-links">
        <button onClick={() => setPage("Home")}>Home</button>
        <button onClick={() => setPage("Destinations")}>Places</button>
        <button onClick={() => setPage("Hotels")}>Hotels</button>
        <button onClick={() => setPage("Vehicles")}>Vehicles</button>
        <button onClick={() => setPage("Packages")}>Packages</button>

        {user && user.role === "user" && (
          <button onClick={() => setPage("My Bookings")}>
            My Bookings
          </button>
        )}

        {user && user.role === "admin" && (
          <button onClick={() => setPage("Admin")}>Admin Dashboard</button>
        )}
      </div>

      <div className="nav-user">
        {user ? (
          <>
            <span>{user.name}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="primary-btn" onClick={() => setPage("Login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;