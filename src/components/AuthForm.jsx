import { useState } from "react";

function AuthForm({ onLogin, onSignup, setPage }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignup) {
      onSignup({ name, email, password });
    } else {
      onLogin({ email, password });
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p>{isSignup ? "Join Wanderly today" : "Login to Wanderly"}</p>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p>
          {isSignup ? "Already have an account?" : "New to Wanderly?"}
          <span
            className="auth-link"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>

        <button
          type="button"
          className="text-btn"
          onClick={() => setPage("Home")}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}

export default AuthForm;